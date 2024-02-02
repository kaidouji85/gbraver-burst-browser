import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BatteryNumberModel } from "../model/battery-number-model";

/**
 * 数字を変更する
 *
 * @param model モデル
 * @param battery 変更する値
 * @return アニメーション
 */
export function change(model: BatteryNumberModel, battery: number): Animate {
  return onStart(() => {
    model.battery = battery;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1.2,
          },
          200,
        ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          200,
        ),
      ),
    );
}
