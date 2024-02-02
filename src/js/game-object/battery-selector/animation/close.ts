import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BatterySelectorModel } from "../model";

/**
 * バッテリーセレクタを閉じる
 *
 * @param model モデル
 * @return アニメーション
 */
export function close(model: BatterySelectorModel): Animate {
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
