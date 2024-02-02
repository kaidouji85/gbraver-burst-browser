import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { FaderModel } from "../model/fader-model";

/**
 * フェードアウト
 *
 * @param model モデル
 * @return アニメーション
 */
export function fadeOut(model: FaderModel): Animate {
  return onStart(() => {
    model.opacity = 0;
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 1,
        },
        500,
      ),
    ),
  );
}
