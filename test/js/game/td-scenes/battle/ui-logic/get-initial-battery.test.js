// @flow

import {getInitialBattery} from "../../../../../../src/js/game/td-scenes/battle/ui-logic/battery-selector";

test('選択可能なバッテリー上限が1以上の場合、バッテリーセレクタの初期値は1になる', () => {
  const result = getInitialBattery(4);
  expect(result).toBe(1);
});

test('選択可能なバッテリー上限が0の場合、バッテリーセレクタの初期値は0になる', () => {
  const result = getInitialBattery(0);
  expect(result).toBe(0);
});