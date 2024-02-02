import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { WingDozerModel } from "../model/wing-dozer-model";

/**
 * ガード
 *
 * @model モデル
 * @return アニメーション
 */
export function guard(model: WingDozerModel): Animate {
  const motion = onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "GUARD";
  });
  const position = tween(model.position, (t) =>
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
  );
  return all(motion, position);
}
