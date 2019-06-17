// @flow

import test from 'ava';
import {getEnableMax} from "../../../../../src/scene/battle/ui-logic/battery-selector";

test('一番大きいバッテリー値を返す', t => {
  const result = getEnableMax([
    {type: 'BATTERY_COMMAND', battery: 0},
    {type: 'BATTERY_COMMAND', battery: 1},
    {type: 'BATTERY_COMMAND', battery: 2},
    {type: 'BATTERY_COMMAND', battery: 3},
    {type: 'BURST_COMMAND'},
  ]);
  t.is(result, 3);
});

test('コマンドリストが空の場合、0を返す', t => {
  const result = getEnableMax([]);
  t.is(result, 0);
});
