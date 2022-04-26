// @flow
import {Tween} from '@tweenjs/tween.js';
import {scaleTweenDuration} from "../../../src/js/animation/duration";

test('Tween Durationがスケールされている', () => {
  const t1 = new Tween({}).to({}, 400);
  scaleTweenDuration(t1, 0.5);
  expect(t1._duration).toBe(200);
});

test('チェインしたTween Durationがスケールされている', () => {
  const t1 = new Tween({}).to({}, 500);
  const t2 = new Tween({}).to({}, 300);
  t1.chain(t2);
  scaleTweenDuration(t1, 0.5);
  expect(t1._duration).toBe(250);
  expect(t2._duration).toBe(150);
});

test('ループしたTweenでもDurationがスケールされている', () => {
  const t1 = new Tween({}).to({}, 600);
  const t2 = new Tween({}).to({}, 400);
  t1.chain(t2);
  t2.chain(t1);
  scaleTweenDuration(t1, 0.5);
  expect(t1._duration).toBe(300);
  expect(t2._duration).toBe(200);
});