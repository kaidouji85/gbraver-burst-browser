// @flow

import test from 'ava';
import {delay} from "../../../src/browser/animation/delay";

test('待ち時間が再生時間としてセットされている', t => {
  const v = delay(400);
  t.is(v._time, 400);
});