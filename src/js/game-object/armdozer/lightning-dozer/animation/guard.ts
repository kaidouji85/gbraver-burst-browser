import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { LightningDozerModel } from "../model/lightning-dozer-model";

/**
 * ガード
 *
 * @param model モデル
 * @return アニメーション
 */
export function guard(model: LightningDozerModel): Animate {
  return all(
    onStart(() => {
      model.animation.frame = 1;
      model.animation.type = "GUARD";
    }),
    tween(model.position, (t) =>
      t.to(
        {
          x: "+20",
        },
        100,
      ),
    ).chain(
      tween(model.position, (t) =>
        t.to(
          {
            x: "-20",
          },
          100,
        ),
      ),
    ),
  );
}
