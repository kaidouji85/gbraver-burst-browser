// @flow

import { delay } from "../../../src/js/animation/delay";

test("待ち時間が再生時間としてセットされている", () => {
  const v = delay(400);
  expect(v._time).toBe(400);
});
