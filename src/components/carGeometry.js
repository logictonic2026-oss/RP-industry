import { BufferGeometry, Float32BufferAttribute } from 'three';

// Slice triangles at the vehicle's world-space centreline. Interpolate normals
// at every crossing so the two halves retain the original smooth body surfaces.
export function bisectGeometry(geometry, side) {
  const positions = geometry.attributes.position;
  const normals = geometry.attributes.normal;
  const indices = geometry.index;
  const output = [], normalOutput = [];
  const count = indices ? indices.count : positions.count;
  for (let triangle = 0; triangle < count; triangle += 3) {
    const vertices = [0, 1, 2].map(offset => {
      const index = indices ? indices.getX(triangle + offset) : triangle + offset;
      return [positions.getX(index), positions.getY(index), positions.getZ(index), normals.getX(index), normals.getY(index), normals.getZ(index)];
    });
    const clipped = [];
    for (let index = 0; index < 3; index++) {
      const a = vertices[index], b = vertices[(index + 1) % 3];
      const insideA = a[0] * side >= 0, insideB = b[0] * side >= 0;
      if (insideA) clipped.push(a);
      if (insideA !== insideB) {
        const t = -a[0] / (b[0] - a[0]);
        clipped.push(a.map((value, axis) => value + (b[axis] - value) * t));
      }
    }
    for (let index = 1; index < clipped.length - 1; index++) {
      for (const vertex of [clipped[0], clipped[index], clipped[index + 1]]) {
        output.push(...vertex.slice(0, 3));
        normalOutput.push(...vertex.slice(3));
      }
    }
  }
  const result = new BufferGeometry();
  result.setAttribute('position', new Float32BufferAttribute(output, 3));
  result.setAttribute('normal', new Float32BufferAttribute(normalOutput, 3));
  result.normalizeNormals();
  result.computeBoundingSphere();
  return result;
}
