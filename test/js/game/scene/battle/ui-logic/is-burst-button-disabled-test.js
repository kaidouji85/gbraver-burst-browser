// @flow

import test from 'ava';
import {canBurstButtonPush} from "../../../../../../src/js/three-js-canvas/scene/battle/ui-logic/burst-button";

test('バーストコマンドが選択可能な場合、バーストボタンは操作可能である', t => {
  const result = canBurstButtonPush([
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BURST_COMMAND'},
  ]);
  t.is(result, true);
});

test('バーストコマンドが選択できない場合、バーストボタンは操作不可能である', t => {
  const result = canBurstButtonPush([
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
  ]);
  t.is(result,  false);
});
