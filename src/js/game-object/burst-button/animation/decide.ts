import { Animate } from "../../../animation/animate";
import { process } from "../../../animation/process";
import { tween } from "../../../animation/tween";
import type { BurstButtonModel } from "../model/burst-button-model";

/**
 * 決定アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function decide(model: BurstButtonModel): Animate {
  return process(() => {
    model.disabled = true;
  })
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1.1,
          },
          100
        )
      )
    )
    .chain(
      tween(model, (t) =>
        t.to(
          {
            scale: 1,
          },
          100
        )
      )
    );
}
