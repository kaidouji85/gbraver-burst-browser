import { all } from "../../../src/js/animation/all";
import { tween } from "../../../src/js/animation/tween";

test("再生時間が一番長いものがnextに設定されている", () => {
  const p1 = tween({}, (t) => t.to({}, 500));
  const p2 = tween({}, (t) => t.to({}, 300));
  const p3 = tween({}, (t) => t.to({}, 1000));
  const v = all(p1, p2, p3);
  expect(v.end).toBe(p3.end);
  expect(v.time).toBe(1000);
});
