// @flow

import test from 'ava';
import {canPilotButtonPush} from "../../../../../../src/js/game/td-scenes/battle/ui-logic/pilot-button";
import type {Command} from "gbraver-burst-core";

test('パイロットスキルコマンドが利用できる場合、パイロットボタンが押せる', t => {
  const commands: Command[] = [
    {type: 'PILOT_SKILL_COMMAND'},
    {type: 'BATTERY_COMMAND', battery: 1}
  ];
  const result = canPilotButtonPush(commands);
  t.true(result);
});

test('パイロットスキルコマンドが使えない場合、パイロットボタンが押せない', t => {
  const commands: Command[] = [
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BURST_COMMAND'}
  ];
  const result = canPilotButtonPush(commands);
  t.false(result);
});