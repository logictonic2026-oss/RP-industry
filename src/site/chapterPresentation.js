import { LAST_STAGE } from '../components/manufacturingStages.js';

const clamp = value => Math.max(0, Math.min(1, value));
const smooth = value => { const t = clamp(value); return t * t * (3 - 2 * t); };
const distanceTo = (progress, index) => Math.abs(clamp(progress) * LAST_STAGE - index);

// Copy remains readable at each exact pose and fades before the next chapter.
export function chapterOpacityAt(progress, index, reduced = false) {
  return reduced ? 1 : 1 - smooth((distanceTo(progress, index) - 0.2) / 0.48);
}

// Section titles are softer than body text and begin fading as scrolling starts.
export function headingOpacityAt(progress, index, reduced = false) {
  if (index === 0) return 1;
  return reduced ? 0.84 : 0.84 - 0.34 * smooth(distanceTo(progress, index) / 0.6);
}
