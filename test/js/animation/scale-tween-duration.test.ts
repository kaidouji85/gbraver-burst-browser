import { Tween } from "@tweenjs/tween.js";

import { scaleTweenDuration } from "../../../src/js/animation/duration";

test("Tween Durationがスケールされている", () => {
  const t1 = new Tween({}).to({}, 400);
  scaleTweenDuration(t1, 0.5);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  expect((t1 as any)._duration).toBe(200);
  /* eslint-enable */
});

test("チェインしたTween Durationがスケールされている", () => {
  const t1 = new Tween({}).to({}, 500);
  const t2 = new Tween({}).to({}, 300);
  t1.chain(t2);
  scaleTweenDuration(t1, 0.5);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  expect((t1 as any)._duration).toBe(250);
  expect((t2 as any)._duration).toBe(150);
  /* eslint-enable */
});

test("ループしたTweenでもDurationがスケールされている", () => {
  const t1 = new Tween({}).to({}, 600);
  const t2 = new Tween({}).to({}, 400);
  t1.chain(t2);
  t2.chain(t1);
  scaleTweenDuration(t1, 0.5);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  expect((t1 as any)._duration).toBe(300);
  expect((t2 as any)._duration).toBe(200);
  /* eslint-enable */
});

test("複雑にチェインしたTweenでもDurationがスケールされている", () => {
  const t1 = new Tween({}).to({}, 100);
  const t2 = new Tween({}).to({}, 200);
  const t3 = new Tween({}).to({}, 300);
  const t4 = new Tween({}).to({}, 400);
  const t5 = new Tween({}).to({}, 500);
  t1.chain(t2.chain(t3.chain(t5)), t4);
  scaleTweenDuration(t1, 0.5);
  /* eslint-disable @typescript-eslint/no-explicit-any */
  expect((t1 as any)._duration).toBe(50);
  expect((t2 as any)._duration).toBe(100);
  expect((t3 as any)._duration).toBe(150);
  expect((t4 as any)._duration).toBe(200);
  expect((t5 as any)._duration).toBe(250);
  /* eslint-enable */
});
