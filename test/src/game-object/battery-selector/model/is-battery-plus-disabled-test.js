// @flow

import test from 'ava';
import type {BatterySelectorModel} from "../../../../../src/game-object/battery-selector/model";
import {EMPTY_BATTERY_SELECTOR} from "../../../../data/battery-selector-model";
import {isBatteryPlusDisabled} from "../../../../../src/game-object/battery-selector/model/is-battery-plus-disabled";

test('バッテリーが5以上ならtrueを返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 5,
  };
  const result = isBatteryPlusDisabled(data);
  t.is(result, true);
});

test('バッテリーが5より小さいならfalseを返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 2,
  };
  const result = isBatteryPlusDisabled(data);
  t.is(result, false);
});