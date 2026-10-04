import { alignEnd } from "../../../src/js/animation/align-end";
import { delay } from "../../../src/js/animation/delay";

test("alignEndだと、一番長いアニメーション時間で再生される", () => {
  const animation1 = delay(1000);
  const animation2 = delay(2000);
  const animation3 = delay(4000);
  const result = alignEnd(animation1, animation2, animation3);
  expect(result.time).toBe(4000);
});
