import { getBatteryGaugeUnitOpacity } from "../../../../../src/js/game-object/gauge/model/get-battery-gauge-unit-opacity";

test("ゲージユニット値が最大バッテリーより小さい場合、不透明度=1となる", () => {
  const gaugeUnit = 1;
  const maxBattery = 5;
  expect(getBatteryGaugeUnitOpacity(gaugeUnit, maxBattery)).toBe(1);
});

test("ゲージユニット値が最大バッテリーと同じ、不透明度=1となる", () => {
  const gaugeUnit = 5;
  const maxBattery = 5;
  expect(getBatteryGaugeUnitOpacity(gaugeUnit, maxBattery)).toBe(1);
});

test("ゲージユニット値が最大バッテリーより大きい、不透明度=0となる", () => {
  const gaugeUnit = 7;
  const maxBattery = 5;
  expect(getBatteryGaugeUnitOpacity(gaugeUnit, maxBattery)).toBe(0);
});
