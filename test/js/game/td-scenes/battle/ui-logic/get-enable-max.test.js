// @flow

import {getEnableMax} from "../../../../../../src/js/game/td-scenes/battle/ui-logic/battery-selector";

test('一番大きいバッテリー値を返す', () => {
  const result = getEnableMax([
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BATTERY_COMMAND', battery: 3},
    {type: 'BURST_COMMAND'},
  ]);
  expect(result).toBe(3);
});

test('コマンドリストが空の場合、0を返す', () => {
  const result = getEnableMax([]);
  expect(result).toBe(0);
});
