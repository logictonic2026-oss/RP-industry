import test from 'node:test';
import assert from 'node:assert/strict';
import { BoxGeometry, BufferGeometry, Float32BufferAttribute, Vector3 } from 'three';
import { bisectGeometry } from '../src/components/carGeometry.js';

function area(geometry) {
  const p = geometry.attributes.position, indices = geometry.index;
  const count = indices ? indices.count : p.count;
  let sum = 0;
  for (let i = 0; i < count; i += 3) {
    const vertices = [0, 1, 2].map(offset => new Vector3().fromBufferAttribute(p, indices ? indices.getX(i + offset) : i + offset));
    sum += vertices[1].sub(vertices[0]).cross(vertices[2].sub(vertices[0])).length() / 2;
  }
  return sum;
}

test('centreline cut preserves surface area and puts every vertex on the correct side', () => {
  const original = new BoxGeometry(2, 2, 4);
  const before = Array.from(original.attributes.position.array);
  const halves = [-1, 1].map(side => {
    const result = bisectGeometry(original, side);
    const p = result.attributes.position;
    for (let i = 0; i < p.count; i++) assert.ok(p.getX(i) * side >= -1e-6);
    assert.equal(result.attributes.normal.count, p.count);
    assert.ok(Number.isFinite(result.boundingSphere.radius));
    return result;
  });
  assert.ok(Math.abs(area(original) - area(halves[0]) - area(halves[1])) < 1e-6);
  assert.deepEqual(Array.from(original.attributes.position.array), before);
});

test('a triangle crossing the cut is interpolated without gaps or invalid normals', () => {
  const original = new BufferGeometry();
  original.setAttribute('position', new Float32BufferAttribute([-2, 0, 0, 2, 0, 0, 2, 3, 0], 3));
  original.computeVertexNormals();
  const left = bisectGeometry(original, -1), right = bisectGeometry(original, 1);
  assert.equal(left.attributes.position.count, 3);
  assert.equal(right.attributes.position.count, 6);
  assert.ok(Math.abs(area(left) + area(right) - 6) < 1e-6);
  for (const half of [left, right]) {
    const n = half.attributes.normal;
    for (let i = 0; i < n.count; i++) assert.ok(Math.abs(new Vector3().fromBufferAttribute(n, i).length() - 1) < 1e-6);
  }
});
