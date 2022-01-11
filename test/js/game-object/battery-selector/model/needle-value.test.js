// @flow

import {getNeedleValue} from "../../../../../src/js/game-object/battery-selector/model/needle-value";
import {MAX_BATTERY} from "../../../../../src/js/game-object/battery-selector/model";

test('現在のバッテリー値 / バッテリー最大値 を返す', () => {
  const result = getNeedleValue(3);
  expect(result).toBe(3/MAX_BATTERY);
});