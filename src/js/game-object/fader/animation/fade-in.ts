import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { FaderModel } from "../model/fader-model";

/**
 * フェードイン
 *
 * @param model モデル
 * @return アニメーション
 */
export function fadeIn(model: FaderModel): Animate {
  return onStart(() => {
    model.opacity = 1;
  }).chain(
    tween(model, (t) =>
      t.to(
        {
          opacity: 0,
        },
        500,
      ),
    ),
  );
}
