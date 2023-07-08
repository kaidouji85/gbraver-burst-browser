import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { BurstButtonModel } from "../model/burst-button-model";

/**
 * バーストボタンを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function open(model: BurstButtonModel, canBurst: boolean): Animate {
  return process(() => {
    model.isPushNotifierDisabled = true;
    model.canBurst = canBurst;
    model.opacity = 0;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            opacity: 1,
          },
          200,
        ),
      ),
    )
    .chain(
      process(() => {
        model.isPushNotifierDisabled = false;
      }),
    );
}
