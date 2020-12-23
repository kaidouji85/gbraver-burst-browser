// @flow

import test from 'ava';
import type {BatterySelectorModel} from "../../../../../src/js/game-object/battery-selector/model";
import {EMPTY_BATTERY_SELECTOR} from "../../../../data/battery-selector-model";
import {canBatteryMinus} from "../../../../../src/js/game-object/battery-selector/model/can-battery-minus";

test('バッテリーが0以下なら-バッテリーボタンが押せない', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 0,
  };
  const result = canBatteryMinus(data);
  t.is(result, false);
});

test('バッテリーが0以下なら-バッテリーボタンは推せる', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 3,
  };
  const result = canBatteryMinus(data);
  t.is(result, true);
});