import { Animate } from "../../../animation/animate";
import { onStart } from "../../../animation/on-start";
import { tween } from "../../../animation/tween";
import type { BurstButtonModel } from "../model/burst-button-model";

/**
 * 決定アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function decide(model: BurstButtonModel): Animate {
  return onStart(() => {
    model.isPushNotifierDisabled = true;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1.1,
          },
          100,
        ),
      ),
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          100,
        ),
      ),
    );
}
