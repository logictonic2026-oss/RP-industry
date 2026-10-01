// glTF may wrap primitives in Groups. Update only renderable descendants,
// and support both single-material and multi-material meshes.
export function highlightPart(group, color, amount) {
  group.traverse(object => {
    if (!object.material) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    for (const material of materials) {
      if (object.userData.isOutline || object.isLineSegments) {
        material.opacity = amount * 0.26;
        material.color?.copy(color);
      } else if (material.emissive) {
        material.emissive.copy(color);
        material.emissiveIntensity = amount * 0.09;
      }
    }
  });
}
