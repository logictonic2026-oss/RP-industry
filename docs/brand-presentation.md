# Brand presentation and approved flow

Reference: `../RP_Group_Brand_Guidelines_v1.0.pdf` (30 September 2026).
The PDF was read in full; the cover, colour, readability and logo pages were
rendered and inspected.

The user approved the continuous automotive experience and requested that its
flow be frozen. Preserve the nine chapters, camera path, scroll mapping, car
movement, part extraction, chapter navigation and service destinations when
making subsequent presentation changes.

## Current presentation

- RP Deep Blue `#142C4F` anchors the dark background, navigation and studio floor.
- Thry Sand `#B49A74` identifies additive manufacturing and restrained accents.
- White and Warm Paper `#F5F2EC` provide readable reverse text.
- Divider `#D9DEE5` is used for neutral metal and fine studio lines.
- Manrope 700 headings and Inter body text follow the font roles in the guide.
- The master logo retains its white backing. Full-width desktop presentation
  uses the guide's 360px starting width; compact navigation still uses the
  existing smaller full logo pending a separately approved symbol-only asset.

`src/site/AutomotiveBrand.css` contains the presentation overrides. The user
explicitly requested the dark cinematic treatment, so the guide's usual
70-percent-light layout ratio is not applied here. Display type sizes remain
adapted to the approved automotive composition.

No camera, timeline, stage order, geometry or interaction changes were made in
the brand pass. Scene changes are limited to material and light colours.

## Checks

Production build passes. All six existing geometry, model and timeline tests
pass. The homepage and brand stylesheet return HTTP 200. Lint reports three
existing warnings in unused legacy Home, RFQ and Footer files.

Contrast on RP Deep Blue: sand 5.20:1, paper 12.51:1 and secondary text 10.79:1.
These are token-pair calculations; they do not replace inspection over rendered
3D content. Final desktop and mobile visual review remains outstanding because
the browser connection was unavailable.

Contact and RFQ flows currently prepare email and a downloadable brief. They
are not connected to a submission backend. The site is a local frontend
preview and has not been deployed.
