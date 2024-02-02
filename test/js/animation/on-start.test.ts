import { onStart } from "../../../src/js/animation/on-start";

test("onStartの再生時間は0である", () => {
  const v = onStart(() => {
    // NOP
  });
  expect(v._time).toBe(0);
});
