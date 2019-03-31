// @flow

import test from 'ava';
import {getNeedleValue} from "../../../../../src/game-object/battery-selector/model/needle-value";
import {MAX_BATTERY} from "../../../../../src/game-object/battery-selector/model";

test('現在のバッテリー値 / バッテリー最大値 を返す', t => {
  const result = getNeedleValue(3);
  t.is(result, 3/MAX_BATTERY);
});