import test from 'node:test';
import assert from 'node:assert/strict';
import { chapterOpacityAt, headingOpacityAt } from '../src/site/chapterPresentation.js';
import { LAST_STAGE } from '../src/components/manufacturingStages.js';

test('scrolling fades section headings before the readable body copy', () => {
  const index = 3;
  const pose = index / LAST_STAGE;
  assert.equal(chapterOpacityAt(pose, index), 1);
  assert.equal(headingOpacityAt(pose, index), 0.84);
  assert.equal(chapterOpacityAt((index + 0.15) / LAST_STAGE, index), 1);
  assert.ok(headingOpacityAt((index + 0.15) / LAST_STAGE, index) < 0.84);
  assert.equal(chapterOpacityAt((index + 0.7) / LAST_STAGE, index), 0);
  for (let step = 0; step <= 100; step++) {
    const offset = step / 100;
    assert.ok(Math.abs(chapterOpacityAt((index + offset) / LAST_STAGE, index) - chapterOpacityAt((index - offset) / LAST_STAGE, index)) < 1e-12);
  }
});

test('each chapter is readable at its exact pose and reduced motion remains static', () => {
  for (let index = 0; index <= LAST_STAGE; index++) {
    assert.equal(chapterOpacityAt(index / LAST_STAGE, index), 1);
    assert.equal(chapterOpacityAt(0.5, index, true), 1);
    assert.equal(headingOpacityAt(0.5, index, true), index === 0 ? 1 : 0.84);
  }
});
