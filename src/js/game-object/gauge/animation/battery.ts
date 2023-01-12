import { all } from "../../../animation/all";
import { Animate } from "../../../animation/animate";
import { tween } from "../../../animation/tween";
import type { GaugeModel } from "../model/gauge-model";

/**
 * バッテリーを変更するアニメーション
 *
 * @param model モデル
 * @param value バッテリー値
 * @return アニメーション
 */
export function battery(model: GaugeModel, value: number): Animate {
  const animations = model.batteryList.map((v) => {
    const brightness = v.value <= value ? 1 : 0;
    return tween(v, (t) =>
      t.to(
        {brightness},
        300
      )
    );
  });
  return all(...animations);
}
