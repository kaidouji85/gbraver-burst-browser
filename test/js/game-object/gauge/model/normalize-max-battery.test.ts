import { BatteryLimit } from "../../../../../src/js/game-object/gauge/model/gauge-model";
import { normalizeMaxBattery } from "../../../../../src/js/game-object/gauge/model/normalize-max-battery";

test("最大バッテリーが整数の場合はそのまま", () => {
  expect(normalizeMaxBattery(5)).toBe(5);
});

test("バッテリーゲージ上限を超えたら、上限値になる", () => {
  expect(normalizeMaxBattery(BatteryLimit + 5)).toBe(BatteryLimit);
});

test("少数の場合は、整数になる", () => {
  expect(normalizeMaxBattery(4.5)).toBe(4);
});

test("0の場合でも正しく動く", () => {
  expect(normalizeMaxBattery(0)).toBe(0);
});
