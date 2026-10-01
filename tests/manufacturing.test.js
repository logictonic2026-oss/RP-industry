import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { Box3, Vector3, Color, Group, Mesh, MeshStandardMaterial, LineSegments, LineBasicMaterial } from 'three';
import { highlightPart } from '../src/components/partMaterials.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { manufacturingStages, LAST_STAGE, timelineAt, stageAtProgress } from '../src/components/manufacturingStages.js';
import { createManufacturingParts } from '../src/components/manufacturingParts.js';

test('each manufacturing service has its own model and distinct destination', () => {
  const parts = createManufacturingParts();
  const services = manufacturingStages.slice(1, -1);
  assert.equal(services.length, 7);
  assert.deepEqual(parts.map(part => part.name), services.map(stage => stage.id));
  assert.equal(new Set(services.map(stage => stage.link)).size, 7);
  for (const part of parts) {
    const box = new Box3().setFromObject(part);
    const dimensions = box.getSize(new Vector3());
    assert.ok(dimensions.toArray().every(value => Number.isFinite(value) && value > 0.05));
    assert.ok(box.getCenter(new Vector3()).length() < 1e-5, `${part.name} should be centred for extraction`);
    assert.ok(part.children.length <= 8, `${part.name} should use merged geometry`);
    part.traverse(mesh => {
      if (!mesh.geometry) return;
      for (const value of mesh.geometry.attributes.position.array) assert.ok(Number.isFinite(value));
    });
  }
});

test('stage buttons land on exact poses and the timeline reverses continuously', () => {
  for (let index = 0; index <= LAST_STAGE; index++) {
    assert.equal(stageAtProgress(index / LAST_STAGE), index);
    const pose = timelineAt(index / LAST_STAGE);
    assert.equal(pose.from, index);
    assert.equal(pose.mix, 0);
  }
  let previous = 0;
  for (let step = 0; step <= 1000; step++) {
    const p = step / 1000;
    const pose = timelineAt(p);
    const value = pose.from + (pose.to - pose.from) * pose.mix;
    assert.ok(value >= previous && value - previous < 0.025);
    previous = value;
  }
  assert.equal(stageAtProgress(-1), 0);
  assert.equal(stageAtProgress(2), LAST_STAGE);
});

test('the shipped component asset loads with all seven models and usable highlight materials', async () => {
  const buffer = await readFile(new URL('../public/models/manufacturing-parts.glb', import.meta.url));
  const { scene } = await new GLTFLoader().parseAsync(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength), '');
  for (const { id } of manufacturingStages.slice(1, -1)) {
    const part = scene.getObjectByName(id);
    assert.ok(part, `Missing ${id} model`);
    for (const amount of [0, 0.5, 1, 0]) {
      assert.doesNotThrow(() => highlightPart(part, new Color('#90c8eb'), amount));
    }
    part.traverse(object => {
      if (!object.material) return;
      if (object.userData.isOutline) assert.ok(object.isLineSegments);
      else assert.ok(object.material.emissive, `${id} needs a lit material`);
    });
  }
  assert.ok(buffer.byteLength < 2_000_000);
});

test('highlighting survives glTF wrapper groups and updates nested material arrays', () => {
  const root = new Group();
  const wrapper = new Group();
  wrapper.userData.isOutline = true;
  const materials = [new MeshStandardMaterial(), new MeshStandardMaterial()];
  const mesh = new Mesh(undefined, materials);
  const outline = new LineSegments(undefined, new LineBasicMaterial({ transparent: true }));
  wrapper.add(outline, mesh);
  root.add(wrapper);
  const tint = new Color('#90c8eb');
  highlightPart(root, tint, 1);
  assert.equal(outline.material.opacity, 0.26);
  for (const material of materials) {
    assert.ok(material.emissive.equals(tint));
    assert.equal(material.emissiveIntensity, 0.09);
  }
  highlightPart(root, tint, 0);
  assert.equal(outline.material.opacity, 0);
  assert.ok(materials.every(material => material.emissiveIntensity === 0));
});
