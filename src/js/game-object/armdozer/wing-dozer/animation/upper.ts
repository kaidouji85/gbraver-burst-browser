import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";

/**
 * アッパー
 *
 * @param model モデル
 * @return アニメーション
 */
export function upper(model: WingDozerModel): Animate {
  return onStart(() => {
    model.animation.type = "UPPER_ATTACK";
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        150,
      ),
    ),
  );
}
