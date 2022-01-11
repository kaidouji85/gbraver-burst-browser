// @flow

import {canPilotButtonPush} from "../../../../../../src/js/game/td-scenes/battle/ui-logic/pilot-button";
import type {Command} from "gbraver-burst-core";

test('パイロットスキルコマンドが利用できる場合、パイロットボタンが押せる', () => {
  const commands: Command[] = [
    {type: 'PILOT_SKILL_COMMAND'},
    {type: 'BATTERY_COMMAND', battery: 1}
  ];
  const result = canPilotButtonPush(commands);
  expect(result).toBe(true);
});

test('パイロットスキルコマンドが使えない場合、パイロットボタンが押せない', () => {
  const commands: Command[] = [
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BURST_COMMAND'}
  ];
  const result = canPilotButtonPush(commands);
  expect(result).toBe(false);
});