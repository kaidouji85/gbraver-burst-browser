import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { PilotButtonModel } from "../model/pilot-button-model";

/**
 * パイロットボタンを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function close(model: PilotButtonModel): Animate {
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
