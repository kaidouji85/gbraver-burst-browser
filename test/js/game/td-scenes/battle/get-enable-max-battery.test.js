// @flow
import {getEnableMaxBattery} from "../../../../../src/js/game/td-scenes/battle/get-enable-max-battery";

test('一番大きいバッテリー値を返す', () => {
  const result = getEnableMaxBattery([
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BATTERY_COMMAND', battery: 3},
    {type: 'BURST_COMMAND'},
  ]);
  expect(result).toBe(3);
});

test('コマンドリストが空の場合、0を返す', () => {
  const result = getEnableMaxBattery([]);
  expect(result).toBe(0);
});
