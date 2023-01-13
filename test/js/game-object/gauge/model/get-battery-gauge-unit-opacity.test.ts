import {
  getBatteryGaugeUnitBrightness
} from "../../../../../src/js/game-object/gauge/model/get-battery-gauge-unit-brightness";

test("ゲージユニット値が現在値以下の場合、輝度=1となる", () => {
  const gaugeUnitValue = 1;
  const battery = 3;
  expect(getBatteryGaugeUnitBrightness(gaugeUnitValue, battery)).toBe(1);
});

test("ゲージユニット値が現在値より大きい場合、輝度=0となる", () => {
  const gaugeUnitValue = 4;
  const battery = 3;
  expect(getBatteryGaugeUnitBrightness(gaugeUnitValue, battery)).toBe(0);
});

test("ゲージユニット値と現在値が同じ場合、輝度=1となる", () => {
  const gaugeUnitValue = 3;
  const battery = 3;
  expect(getBatteryGaugeUnitBrightness(gaugeUnitValue, battery)).toBe(1);
});