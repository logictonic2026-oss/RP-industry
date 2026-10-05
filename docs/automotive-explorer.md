# Automotive explorer

The homepage is a full-screen 3D scroll sequence. The assembled vehicle starts
on a concrete floor inside an authored manufacturing bay with CNC machines,
steel columns, ceiling lights and painted bay markings. Architecture, floor,
vehicle and shadows use the same world-space camera; there is no composited
photographic floor.

Scrolling to `/#manufacturing` opens the body and introduces the first component.
A single reversible timeline controls body sectioning, component extraction and
reassembly. On the homepage the camera, vehicle scale and wheel positions stay
fixed throughout the sequence. On desktop and tablet the car and extracted
components are anchored at 73% of the viewport width, leaving the copy clear
on the left. Camera framing reserves room for the opened body; bay markings
and contact shadows follow the same anchor. Mobile retains its stacked layout.
The model's minimum Y matches its wheel minimum
Y, and the vehicle translation aligns it with the floor at Y = -0.19.

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
- `AutomotiveExperience.jsx` / `.css` / `AutomotiveBrand.css` / `Minimal.css`: homepage chapters, responsive presentation and controls. The final minimal theme uses a flat header, light typography and thin chapter dividers.
- `chapterPresentation.js`: reversible copy and heading opacity curves. Headings start fading before body copy; reduced motion retains static readable copy.
- `CreditsPage.jsx`: vehicle source, license and modification details, linked from the footer rather than the scroll scene.
- `EngineeringStudio.jsx`: manufacturing bay, physical floor and contact shadows.
- `CarScroller.jsx` / `.css`: alternative embedded presentation.
- `CarScene.jsx`: car preparation, camera framing and component extraction.
- `manufacturingParts.js`: authored example geometry. This module runs offline,
  not in the browser.
- `public/models/manufacturing-parts.glb`: prebuilt, indexed component meshes.
- `scripts/build-manufacturing-parts.mjs`: rebuild the asset after geometry edits.

The 3D bundle is loaded near the section. Draco files and models are local.
Component meshes are merged by material and indexed before export. The canvas
uses demand rendering, a capped pixel ratio, one 1024px directional shadow map
and a 256px contact-shadow pass. Lenis
owns the only page-scroll interpolation loop and cleans it up on unmount. Reduced
motion snaps the homepage to chapter poses rather than interpolating motion.

## Checks

Run `npm run build`, `npm run lint`, and `node --test tests/*.test.js`.
The tests cover triangle sectioning, geometry validity, component/process mapping
and continuous reversible timeline transitions. The website has unrelated lint
warnings in Home, Footer and RFQ.

The production build and all eight presentation/geometry/manufacturing tests pass. Lint has
only the existing warnings in Home, Footer and RFQ. Asset-bound verification
confirmed zero gap between the wheel minimum and model minimum. Projection
checks at six desktop/tablet sizes keep the complete and opened body between
50.2% and 95.8% of viewport width, clear of the text. Chrome loaded
the revised homepage and reported the scene ready. Screenshot capture timed out,
so final desktop/mobile visual and frame-rate review remains necessary.
