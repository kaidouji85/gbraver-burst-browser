import type { BatterySelectorModel } from "../../../../../src/js/game-object/battery-selector/model";
import { canNumberChanged } from "../../../../../src/js/game-object/battery-selector/model/can-number-change";
import { EMPTY_BATTERY_SELECTOR } from "../../../../data/battery-selector-model";

test("値が範囲内の場合、変更できる", () => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    enableMaxBattery: 5,
  };
  const result = canNumberChanged(data, 2);
  expect(result).toBe(true);
});

test("値が選択可能なバッテリー最大値と等しい場合、変更できる", () => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    enableMaxBattery: 3,
  };
  const result = canNumberChanged(data, 3);
  expect(result).toBe(true);
});

test("値が0の場合、変更できる", () => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    enableMaxBattery: 5,
  };
  const result = canNumberChanged(data, 0);
  expect(result).toBe(true);
});

test("値が選択可能なバッテリー最大値より大きい場合、変更できない", () => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    enableMaxBattery: 5,
  };
  const result = canNumberChanged(data, 6);
  expect(result).toBe(false);
});

test("値が0未満の場合、変更できない", () => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    enableMaxBattery: 3,
  };
  const result = canNumberChanged(data, -1);
  expect(result).toBe(false);
});
