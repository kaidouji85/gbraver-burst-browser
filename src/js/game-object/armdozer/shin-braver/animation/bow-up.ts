import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * 礼（起き上がる）
 * @param model シンブレイバーモデル
 * @return アニメーション
 */
export function bowUp(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = "BOW";
    model.animation.frame = 1;
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          200,
        ),
      ),
    )
    .chain(
      process(() => {
        model.animation.type = "UPRIGHT";
      }),
    );
}
