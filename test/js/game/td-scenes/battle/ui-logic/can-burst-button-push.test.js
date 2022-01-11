// @flow

import {canBurstButtonPush} from "../../../../../../src/js/game/td-scenes/battle/ui-logic/burst-button";

test('バーストコマンドが選択可能な場合、バーストボタンは操作可能である', () => {
  const result = canBurstButtonPush([
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BURST_COMMAND'},
  ]);
  expect(result).toBe(true);
});

test('バーストコマンドが選択できない場合、バーストボタンは操作不可能である', () => {
  const result = canBurstButtonPush([
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
  ]);
  expect(result).toBe( false);
});
