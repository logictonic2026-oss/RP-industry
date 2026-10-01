# Vehicle model

Ferrari 458 Italia by vicent091036, distributed with the Three.js examples.

- Creator/source: https://sketchfab.com/models/57bf6cc56931426e87494f554df1dab6
- Download: https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/ferrari.glb
- License: Creative Commons Attribution (CC BY), https://creativecommons.org/licenses/by/4.0/
- Changes: silver materials, centreline body sectioning, exploded component positions,
  and illustrative material/process highlighting performed at runtime.

The vehicle illustrates manufacturing applications; it does not claim a supply
relationship with Ferrari or that the depicted components use a specific process.
Visible author credit and source link are included in the website section.

## Manufacturing examples

`manufacturing-parts.glb` contains seven original illustrative components authored
for this website: engine housing, mounting bracket, gasket/bushing, locating
fixture, console prototype, lens prototype and air duct. They are not extracted
Ferrari components or validated production CAD. Regenerate with
`node scripts/build-manufacturing-parts.mjs`.

The local Draco decoder files are copied from the installed Three.js distribution.
Draco is Copyright Google, licensed under Apache-2.0:
https://github.com/google/draco/blob/main/LICENSE
