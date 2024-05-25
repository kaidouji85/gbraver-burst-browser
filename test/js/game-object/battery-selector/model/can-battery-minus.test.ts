import type { BatterySelectorModel } from "../../../../../src/js/game-object/battery-selector/model";
import { canBatteryMinus } from "../../../../../src/js/game-object/battery-selector/model/can-battery-minus";
import { EMPTY_BATTERY_SELECTOR } from "../../../../data/battery-selector-model";

test("バッテリーが0以下なら-バッテリーボタンが押せない", () => {
  const data: BatterySelectorModel = { ...EMPTY_BATTERY_SELECTOR, battery: 0 };
  const result = canBatteryMinus(data);
  expect(result).toBe(false);
});

test("バッテリーが0以下なら-バッテリーボタンは推せる", () => {
  const data: BatterySelectorModel = { ...EMPTY_BATTERY_SELECTOR, battery: 3 };
  const result = canBatteryMinus(data);
  expect(result).toBe(true);
});
