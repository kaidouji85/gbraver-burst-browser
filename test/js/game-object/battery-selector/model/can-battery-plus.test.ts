import type { BatterySelectorModel } from "../../../../../src/js/game-object/battery-selector/model";
import { canBatteryPlus } from "../../../../../src/js/game-object/battery-selector/model/can-battery-plus";
import { EMPTY_BATTERY_SELECTOR } from "../../../../data/battery-selector-model";
test("バッテリーが最大値以上の場合、バッテリー+ボタンを押すことはできない", () => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 3,
    enableMaxBattery: 3,
  };
  const result = canBatteryPlus(data);
  expect(result).toBe(false);
});
test("バッテリーが最大値より小さい場合、バッテリー+ボタンを押すことができる", () => {
  const data: BatterySelectorModel = {
    ...EMPTY_BATTERY_SELECTOR,
    battery: 2,
    enableMaxBattery: 3,
  };
  const result = canBatteryPlus(data);
  expect(result).toBe(true);
});
