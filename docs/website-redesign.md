# Website redesign

The active pages live in `src/site/`, with routing in `src/App.jsx`. The home,
company, sector, process, printing application, contact and quote pages share
the new navy, sand and paper visual system. The second home section is the
automotive explorer, with seven illustrative process components.

## Blank car correction

The loaded glTF contains wrapper Groups with outline metadata but no material.
The former animation attempted to set their material opacity and threw before
the frame could render. `partMaterials.js` now traverses renderable descendants,
skips missing materials and supports material arrays. Tests exercise both the
shipped GLB and a nested wrapper regression case. DOM labels formerly mounted
through drei Html were removed to avoid additional React roots during reloads.

## Inquiry flow

No submission backend is connected. Contact and quote flows prepare an email;
the quote flow also downloads a brief. Selected files stay local and must be
attached to the outgoing email. The UI explicitly describes these steps.

## Generated hero artwork

Asset: `public/manufacturing-hero.png`. Created using the built-in image
generation tool as a concept illustration, not a photograph of RP production.

Prompt brief: premium manufacturing product composition, silver CNC machined
flange and housing with milled pockets, six holes and concentric tool marks,
beside a warm sand printed lattice housing; off-white surface, soft shadows,
navy reflections, no text, logo or car, landscape 3:2 composition.

## Verification

Production build and six geometry, timeline and highlight tests pass. HTTP
checks return 200 for the homepage, sampled service routes, quote route, both
GLB assets, local Draco decoder files and hero artwork. Browser visual review
remains outstanding because Windows capture reports `window capture timed out:
timed out waiting on channel`. HTTP and unit checks do not establish visual
quality or device-specific animation smoothness.

Preview: `npm.cmd run dev -- --host 127.0.0.1 --port 5173 --strictPort`, then
open `http://127.0.0.1:5173/`.
