// @flow

import test from 'ava';
import type {BatterySelectorModel} from "../../../../../src/game-object/battery-selector/model";
import {EMPTY_BATTERY_SELECTOR} from "../../../../data/battery-selector-model";
import {plusBattery} from "../../../../../src/game-object/battery-selector/model/battery-change";

test('現在のバッテリー値 < 選択可能最大値 なら現在のバッテリー値+1を返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 3,
    enableMaxBattery: 4
  };
  const result = plusBattery(data);
  t.is(result, 4);
});

test('現在のバッテリー値 = 選択可能最大値 なら現在のバッテリー値を返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 2,
    enableMaxBattery: 2
  };
  const result = plusBattery(data);
  t.is(result, 2);
});