import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BatteryNumberModel } from "../model/battery-number-model";

/**
 * バッテリー数字を表示する
 *
 * @param model モデル
 * @param battery バッテリー値
 * @return アニメーション
 */
export function show(model: BatteryNumberModel, battery: number): Animate {
  return onStart(() => {
    model.opacity = 0;
    model.scale = 1.2;
    model.battery = battery;
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 1,
          scale: 1,
        },
        300,
      ),
    ),
  );
}
