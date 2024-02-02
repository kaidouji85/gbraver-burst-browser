import type { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { TimeScaleButtonModel } from "../model/time-scale-button-model";

/**
 * ボタンを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function close(model: TimeScaleButtonModel): Animate {
  return onStart(() => {
    model.isPushNotifierDisabled = true;
    model.opacity = 1;
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 0,
        },
        200,
      ),
    ),
  );
}
