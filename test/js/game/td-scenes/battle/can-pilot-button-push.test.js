// @flow
import type {Command} from "gbraver-burst-core";
import {canPilotButtonPush} from "../../../../../src/js/td-scenes/battle/can-pilot-button-push";

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

test('コマンドリストが空の場合、パイロットボタンが押せないとみなす', () => {
  const commands: Command[] = [];
  const result = canPilotButtonPush(commands);
  expect(result).toBe(false);
});