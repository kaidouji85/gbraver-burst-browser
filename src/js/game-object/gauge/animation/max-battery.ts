import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { GaugeModel } from "../model/gauge-model";
import { getBatteryGaugeUnitOpacity } from "../model/get-battery-gauge-unit-opacity";
import { process } from "../../../animation/process";

/**
 * バッテリー最大値を変更するアニメーション
 * @param model モデル
 * @param value バッテリー最大値
 * @return アニメーション
 */
export function maxBattery(model: GaugeModel, value: number): Animate {
  return all(
    process(() => {
      model.maxBattery = value;
    }),
    ...model.batteryList.map((gaugeUnit) =>
      tween(gaugeUnit, (t) =>
        t.to(
          { opacity: getBatteryGaugeUnitOpacity(gaugeUnit.value, value) },
          300
        )
      )
    )
  );
}
