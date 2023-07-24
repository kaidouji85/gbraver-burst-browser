import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { GenesisBraverModel } from "../model/genesis-braver-model";

/**
 * ガード
 * @param model モデル
 * @return アニメーション
 */
export function guard(model: GenesisBraverModel): Animate {
  const motion = process(() => {
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
