import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { GaugeModel } from "../model/gauge-model";
import { getBatteryGaugeUnitBrightness } from "../model/get-battery-gauge-unit-brightness";

/**
 * バッテリーを変更するアニメーション
 * @param model モデル
 * @param value バッテリー値
 * @returns アニメーション
 */
export function battery(model: GaugeModel, value: number): Animate {
  return all(
    ...model.batteryList.map((gaugeUnit) => {
      return tween(gaugeUnit, (t) =>
        t.to(
          { brightness: getBatteryGaugeUnitBrightness(gaugeUnit.value, value) },
          300,
        ),
      );
    }),
  );
}
