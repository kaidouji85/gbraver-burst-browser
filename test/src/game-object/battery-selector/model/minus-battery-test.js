// @flow

import test from 'ava';
import type {BatterySelectorModel} from "../../../../../src/game-object/battery-selector/model";
import {EMPTY_BATTERY_SELECTOR} from "../../../../data/battery-selector-model";
import {minusBattery} from "../../../../../src/game-object/battery-selector/model/battery-change";

test('0 < 現在のバッテリー値 なら現在のバッテリー値-1を返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 3,
  };
  const result = minusBattery(data);
  t.is(result, 2);
});

test('現在のバッテリー値 = 0 なら現在のバッテリー値-1を返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 0,
  };
  const result = minusBattery(data);
  t.is(result, 0);
});