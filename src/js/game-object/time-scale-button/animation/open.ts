import type { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { TimeScaleButtonModel } from "../model/time-scale-button-model";

/**
 * ボタンを表示する
 *
 * @param model モデル
 * @param timeScale タイムスケール値
 * @return アニメーション
 */
export function open(model: TimeScaleButtonModel, timeScale: number): Animate {
  return onStart(() => {
    model.shouldPushNotifierStop = true;
    model.opacity = 0;
    model.timeScale = timeScale;
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
      onStart(() => {
        model.shouldPushNotifierStop = false;
      }),
    );
}
