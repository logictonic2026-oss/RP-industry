# Automotive explorer

The homepage's second section is a full-screen 3D scroll sequence at
`/#manufacturing`. A single continuous timeline controls the camera, body
sectioning, wheel separation, component extraction and reassembly.

| Stage | Featured object | Application |
| --- | --- | --- |
| Overview | Detailed car model | Assembled vehicle |
| VMC | Engine housing with bores and mounting holes | Faces, pockets, drilling |
| Billet | Pocketed mounting bracket | Machining from solid aluminium |
| Rubber | Gasket and sleeved bushing | Sealing and vibration isolation |
| Jigs & fixtures | Baseplate, pins and clamps holding a part | Manufacturing/inspection tooling |
| FDM | Layered console with cupholder openings | Form and fit prototype |
| SLA | Translucent lens concept with fine ribs | Appearance and assembly prototype |
| SLS | Hollow curved duct with flanges and mounting tabs | Nylon functional prototype |
| Together | Reassembled car | Request a quote |

These are representative process applications. The added component models are
illustrative, not the actual vehicle's CAD or claims about RP's supply chain.
The fixture appears independently as production tooling. Printed lens geometry
does not imply certified optical performance or road-ready parts.

Application reference: https://formlabs.com/industries/automotive/

## Files and performance

- `manufacturingStages.js`: service copy and shared stage timeline.
- `CarScroller.jsx` / `.css`: full-screen presentation and accessible controls.
- `CarScene.jsx`: car preparation, camera framing and component extraction.
- `manufacturingParts.js`: authored example geometry. This module runs offline,
  not in the browser.
- `public/models/manufacturing-parts.glb`: prebuilt, indexed component meshes.
- `scripts/build-manufacturing-parts.mjs`: rebuild the asset after geometry edits.

The 3D bundle is loaded near the section. Draco files and models are local.
Component meshes are merged by material and indexed before export. The canvas
uses demand rendering, a capped pixel ratio and no realtime shadow passes. Lenis
owns the only page-scroll interpolation loop and cleans it up on unmount. Reduced
motion uses a static-height section with explicit stage controls.

## Checks

Run `npm run build`, `npm run lint`, and `node --test tests/*.test.js`.
The tests cover triangle sectioning, geometry validity, component/process mapping
and continuous reversible timeline transitions. The website has unrelated lint
warnings in Home, Footer and RFQ.

Browser screenshot capture was unavailable during this revision, so final visual
and device-specific frame-rate review remains necessary.
