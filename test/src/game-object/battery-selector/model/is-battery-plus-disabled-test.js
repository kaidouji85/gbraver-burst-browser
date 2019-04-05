// @flow

import test from 'ava';
import type {BatterySelectorModel} from "../../../../../src/game-object/battery-selector/model";
import {EMPTY_BATTERY_SELECTOR} from "../../../../data/battery-selector-model";
import {isBatteryPlusDisabled} from "../../../../../src/game-object/battery-selector/model/is-battery-plus-disabled";

test('バッテリーが最大値以上ならtrueを返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 5,
  };
  const result = isBatteryPlusDisabled(data);
  t.is(result, true);
});


test('バッテリーが選択できる最大値以上の場合trueを返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 3,
    enableMaxBattery: 3
  };
  const result = isBatteryPlusDisabled(data);
  t.is(result, true);
});

test('バッテリーが最大値、選択できる最大値より小さい場合falseを返す', t => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 2,
    enableMaxBattery: 3
  };
  const result = isBatteryPlusDisabled(data);
  t.is(result, false);
});