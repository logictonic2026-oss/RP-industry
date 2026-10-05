# Neumorphic UI

This is the previous design experiment. The active site now imports `Minimal.css` and uses native flat controls; `Neumorphism.css` and the adapted ThreeUI control are retained as inactive reference files.

The site's controls and interactive surfaces use opposing soft shadows on a shared background color. The manufacturing explorer uses dark graphite; the service and enquiry pages use pale gray. The hero copy remains on an open vignette to preserve the text hierarchy and leave the car visible on the right.

`src/site/Neumorphism.css` was the final theme layer imported by `App.jsx`. It styles the floating navigation, chapter controls, enquiry fields, process choices, application cards and FAQs. Raised surfaces indicate actions; inset surfaces indicate selected controls and editable fields. Keyboard focus has a separate outline, and reduced-motion and forced-color preferences are supported.

The hero's `NeuAction` uses the native React CircleButtons control from the locally installed **ThreeUI Community 1.2.0** package at `E:/logic tonic/node_modules/@designcodeio/threeui`. Its scoped styles and MIT license are included in `src/site/ui/threeui`. The adaptation adds a visible text label and uses the existing chapter-scroll function. It needs no iframe or extra runtime dependency.

The 3D manufacturing bay, grounded car, removed workbench and component scroll animation are unchanged by this theme.
