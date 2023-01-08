import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { LightningDozerModel } from "../model/lightning-dozer-model";

/**
 * ノックバック
 *
 * @param model モデル
 * @return アニメーション
 */
export function knockBack(model: LightningDozerModel): Animate {
  return all(
    process(() => {
      model.animation.type = "KNOCK_BACK";
      model.animation.frame = 1;
    }),
    tween(model.position, (t) =>
      t.to(
        {
          x: "+20",
        },
        100
      )
    ).chain(
      tween(model.position, (t) =>
        t.to(
          {
            x: "-20",
          },
          100
        )
      )
    )
  );
}
