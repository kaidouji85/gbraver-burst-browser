import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BurstButtonModel } from "../model/burst-button-model";

/**
 * バーストボタンを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function close(model: BurstButtonModel): Animate {
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
