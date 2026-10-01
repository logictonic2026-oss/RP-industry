import { Box3, BoxGeometry, CatmullRomCurve3, CylinderGeometry, EdgesGeometry, ExtrudeGeometry, Group, LineBasicMaterial, LineSegments, Mesh, MeshPhysicalMaterial, MeshStandardMaterial, Path, Shape, TorusGeometry, TubeGeometry, Vector3 } from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { mergeGeometries, mergeVertices } from 'three/addons/utils/BufferGeometryUtils.js';

const steel = () => new MeshStandardMaterial({ color: '#aab9c6', metalness: 0.82, roughness: 0.27 });
const dark = () => new MeshStandardMaterial({ color: '#202a32', metalness: 0.15, roughness: 0.75 });
const polymer = () => new MeshStandardMaterial({ color: '#b49a74', metalness: 0.08, roughness: 0.62 });

function add(root, geometry, material, position = [0, 0, 0], rotation = [0, 0, 0]) {
  const mesh = new Mesh(geometry, material);
  mesh.position.set(...position); mesh.rotation.set(...rotation); root.add(mesh);
  return mesh;
}
function circleHole(shape, x, y, radius) { const hole = new Path(); hole.absarc(x, y, radius, 0, Math.PI * 2, true); shape.holes.push(hole); }
function rectangle(width, height) {
  const s = new Shape(); s.moveTo(-width / 2, -height / 2); s.lineTo(width / 2, -height / 2); s.lineTo(width / 2, height / 2); s.lineTo(-width / 2, height / 2); s.closePath(); return s;
}
function plate(shape, depth, bevel = 0.02) { return new ExtrudeGeometry(shape, { depth, bevelEnabled: bevel > 0, bevelSegments: 2, steps: 1, bevelSize: bevel, bevelThickness: bevel, curveSegments: 24 }); }
function bolt(root, material, x, y, z) { add(root, new CylinderGeometry(0.055, 0.055, 0.06, 6), material, [x, y, z]); }

function engineHousing() {
  const root = new Group(), metal = steel(), black = dark();
  const top = rectangle(1.08, 2.05);
  for (const z of [-0.67, 0, 0.67]) circleHole(top, 0, z, 0.265);
  for (const x of [-0.43, 0.43]) for (const z of [-0.85, -0.28, 0.28, 0.85]) circleHole(top, x, z, 0.045);
  add(root, plate(top, 0.5, 0.016), metal, [0, 0.28, 0], [-Math.PI / 2, 0, 0]);
  add(root, new RoundedBoxGeometry(1.12, 0.23, 2.1, 2, 0.055), metal, [0, 0.15, 0]);
  for (const z of [-0.67, 0, 0.67]) {
    add(root, new CylinderGeometry(0.25, 0.25, 0.06, 32), black, [0, 0.29, z]);
    add(root, new TorusGeometry(0.268, 0.012, 8, 40), metal, [0, 0.798, z], [Math.PI / 2, 0, 0]);
  }
  for (let i = 0; i < 6; i++) for (const side of [-1, 1]) add(root, new BoxGeometry(0.04, 0.44, 0.055), metal, [side * 0.565, 0.5, -0.85 + i * 0.34]);
  for (const side of [-1, 1]) add(root, new RoundedBoxGeometry(0.24, 0.15, 0.45, 2, 0.025), metal, [side * 0.6, 0.25, 0.6]);
  return root;
}

function billetBracket() {
  const root = new Group(), metal = steel();
  const s = new Shape();
  s.moveTo(-0.83, -0.45); s.lineTo(0.83, -0.45); s.lineTo(0.83, -0.03); s.lineTo(0.3, 0.72); s.lineTo(-0.3, 0.72); s.lineTo(-0.83, -0.03); s.closePath();
  circleHole(s, 0, 0.4, 0.19); circleHole(s, -0.61, -0.22, 0.095); circleHole(s, 0.61, -0.22, 0.095);
  const pocket = new Path(); pocket.moveTo(-0.38, -0.18); pocket.lineTo(0.38, -0.18); pocket.lineTo(0.21, 0.09); pocket.lineTo(-0.21, 0.09); pocket.closePath(); s.holes.push(pocket);
  add(root, plate(s, 0.2, 0.045), metal, [0, 0, -0.1]);
  // Recessed bosses and perimeter machining detail.
  for (const [x, y, r] of [[0, 0.4, 0.21], [-0.61, -0.22, 0.11], [0.61, -0.22, 0.11]]) add(root, new TorusGeometry(r, 0.025, 8, 40), metal, [x, y, 0.14]);
  return root;
}

function rubberComponents() {
  const root = new Group(), rubber = new MeshStandardMaterial({ color: '#333c43', roughness: 0.88 }), metal = steel();
  const s = rectangle(1.32, 0.82), opening = rectangle(1.04, 0.55); s.holes.push(new Path(opening.getPoints()));
  for (const x of [-0.57, 0.57]) for (const z of [-0.33, 0.33]) circleHole(s, x, z, 0.04);
  add(root, plate(s, 0.04, 0.018), rubber, [-0.13, 0.12, -0.15], [-Math.PI / 2, 0, 0]);
  const ring = new Shape(); ring.absarc(0, 0, 0.28, 0, Math.PI * 2, false); circleHole(ring, 0, 0, 0.125);
  add(root, plate(ring, 0.5, 0.035), rubber, [0.52, 0.35, 0.55], [Math.PI / 2, 0, 0]);
  const sleeve = new Shape(); sleeve.absarc(0, 0, 0.12, 0, Math.PI * 2, false); circleHole(sleeve, 0, 0, 0.075);
  add(root, plate(sleeve, 0.57, 0.005), metal, [0.52, 0.39, 0.55], [Math.PI / 2, 0, 0]);
  return root;
}

function machiningFixture() {
  const root = new Group(), metal = steel(), black = dark(), blue = new MeshStandardMaterial({ color: '#366789', metalness: 0.6, roughness: 0.38 });
  const base = rectangle(1.9, 1.5);
  for (const x of [-0.76, 0.76]) for (const y of [-0.54, 0, 0.54]) circleHole(base, x, y, 0.06);
  add(root, plate(base, 0.13, 0.02), metal, [0, 0, 0], [-Math.PI / 2, 0, 0]);
  add(root, new RoundedBoxGeometry(0.9, 0.18, 0.65, 2, 0.03), black, [0, 0.23, 0]);
  const bracket = billetBracket(); bracket.scale.setScalar(0.55); bracket.rotation.x = -Math.PI / 2; bracket.position.y = 0.38; root.add(bracket);
  for (const x of [-0.65, 0.65]) {
    add(root, new BoxGeometry(0.17, 0.26, 0.45), blue, [x, 0.26, 0.05]);
    add(root, new RoundedBoxGeometry(0.42, 0.08, 0.17, 2, 0.025), blue, [x * 0.78, 0.43, 0.05]);
    bolt(root, metal, x, 0.5, 0.05);
    add(root, new CylinderGeometry(0.035, 0.035, 0.25, 16), metal, [x * 0.53, 0.3, -0.4]);
  }
  return root;
}

function consolePrototype() {
  const root = new Group(), plastic = polymer(), grooves = new MeshStandardMaterial({ color: '#756b5a', roughness: 0.8 });
  const s = new Shape(); s.moveTo(-0.42, -0.85); s.lineTo(0.42, -0.85); s.lineTo(0.32, 0.85); s.lineTo(-0.32, 0.85); s.closePath();
  circleHole(s, 0, -0.32, 0.22); circleHole(s, 0, 0.23, 0.22);
  add(root, plate(s, 0.3, 0.035), plastic, [0, 0.05, 0], [-Math.PI / 2, 0, 0]);
  for (let layer = 0; layer < 13; layer++) {
    const outline = new Shape(); outline.moveTo(-0.421, -0.85); outline.lineTo(0.421, -0.85); outline.lineTo(0.321, 0.85); outline.lineTo(-0.321, 0.85); outline.closePath();
    const inner = new Path(); inner.moveTo(-0.412, -0.84); inner.lineTo(0.412, -0.84); inner.lineTo(0.312, 0.84); inner.lineTo(-0.312, 0.84); inner.closePath(); outline.holes.push(inner);
    add(root, plate(outline, 0.003, 0), grooves, [0, 0.065 + layer * 0.023, 0], [-Math.PI / 2, 0, 0]);
  }
  add(root, new RoundedBoxGeometry(0.45, 0.16, 0.3, 2, 0.04), plastic, [0, 0.41, -0.65]);
  return root;
}

function lensPrototype() {
  const root = new Group();
  const resin = new MeshPhysicalMaterial({ color: '#b5dbe8', metalness: 0.05, roughness: 0.16, transparent: true, opacity: 0.7, clearcoat: 1, side: 2 });
  const trim = new MeshStandardMaterial({ color: '#53748a', metalness: 0.45, roughness: 0.25 });
  const s = new Shape(); s.moveTo(-0.85, -0.23); s.quadraticCurveTo(-0.95, 0.16, -0.65, 0.28); s.quadraticCurveTo(0.1, 0.5, 0.91, 0.05); s.lineTo(0.64, -0.23); s.quadraticCurveTo(0, -0.38, -0.85, -0.23);
  add(root, plate(s, 0.15, 0.04), resin, [0, 0.1, 0]);
  for (let rib = 0; rib < 11; rib++) {
    const x = -0.67 + rib * 0.13;
    add(root, new RoundedBoxGeometry(0.016, 0.33 - rib * 0.008, 0.035, 2, 0.008), resin, [x, 0.11, 0.18], [0, 0, -0.12]);
  }
  for (const x of [-0.65, 0.65]) add(root, new RoundedBoxGeometry(0.17, 0.1, 0.16, 2, 0.025), trim, [x, -0.25, 0.04]);
  return root;
}

function airDuct() {
  const root = new Group(), nylon = new MeshStandardMaterial({ color: '#b6b9b7', roughness: 0.88, side: 2 });
  const curve = new CatmullRomCurve3([new Vector3(-0.75, -0.2, 0), new Vector3(-0.42, -0.12, 0), new Vector3(0, 0.17, 0.05), new Vector3(0.32, 0.4, 0.05), new Vector3(0.68, 0.4, 0.05)]);
  add(root, new TubeGeometry(curve, 40, 0.22, 28, false), nylon);
  // Inner wall and annular ends keep the duct visibly hollow.
  const inner = new TubeGeometry(curve, 40, 0.175, 28, false); inner.scale(1, 1, 1); add(root, inner, nylon);
  for (const [x, y, z] of [[-0.75, -0.2, 0], [0.68, 0.4, 0.05]]) {
    const flange = new Shape(); flange.absarc(0, 0, 0.3, 0, Math.PI * 2, false); circleHole(flange, 0, 0, 0.175);
    add(root, plate(flange, 0.07, 0.012), nylon, [x, y, z], [0, Math.PI / 2, 0]);
  }
  for (const x of [-0.35, 0.33]) {
    const tab = rectangle(0.24, 0.32); circleHole(tab, 0, 0.04, 0.05);
    add(root, plate(tab, 0.07, 0.02), nylon, [x, 0.1 + x * 0.5, -0.32], [Math.PI / 2, 0, 0]);
  }
  return root;
}

// Merge by material once at load time. Each detailed part then needs only a few
// draw calls, instead of drawing every bolt, rib and printed layer separately.
function optimisePart(root) {
  root.updateMatrixWorld(true);
  const bounds = new Box3().setFromObject(root), center = bounds.getCenter(new Vector3());
  const buckets = new Map();
  root.traverse(mesh => {
    if (!mesh.isMesh) return;
    const geometry = mesh.geometry.clone().applyMatrix4(mesh.matrixWorld).translate(-center.x, -center.y, -center.z);
    if (!buckets.has(mesh.material)) buckets.set(mesh.material, []);
    buckets.get(mesh.material).push(geometry.index ? geometry.toNonIndexed() : geometry);
    if (geometry.index) geometry.dispose();
    mesh.geometry.dispose();
  });
  const result = new Group();
  for (const [material, geometries] of buckets) {
    const combined = mergeGeometries(geometries);
    combined.deleteAttribute('uv');
    const merged = mergeVertices(combined);
    combined.dispose();
    geometries.forEach(g => g.dispose());
    const mesh = new Mesh(merged, material); result.add(mesh);
    mesh.userData.baseColor = material.color.clone();
    const edge = new LineSegments(new EdgesGeometry(merged, 32), new LineBasicMaterial({ color: '#b3dff5', transparent: true, opacity: 0.35 }));
    edge.userData.isOutline = true; result.add(edge);
  }
  return result;
}

export function createManufacturingParts() {
  return [engineHousing, billetBracket, rubberComponents, machiningFixture, consolePrototype, lensPrototype, airDuct].map((build, index) => {
    const group = optimisePart(build());
    group.name = ['vmc', 'billet', 'rubber', 'jigs', 'fdm', 'sla', 'sls'][index];
    return group;
  });
}
