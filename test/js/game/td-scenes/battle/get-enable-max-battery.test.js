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


test('バッテリーコマンドが含まれない場合は0を返す', () => {
  const result = getEnableMaxBattery([
    {type: 'BURST_COMMAND'},
    {type: 'PILOT_SKILL_COMMAND'}
  ]);
  expect(result).toBe(0);
});

test('コマンドリストが空の場合は0を返す', () => {
  const result = getEnableMaxBattery([]);
  expect(result).toBe(0);
});
