import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";

/**
 * 礼（倒れる）
 * @param model シンブレイバーモデル
 * @return アニメーション
 */
export function bowDown(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = "BOW";
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, (t) =>
      t.to(
        {
          frame: 1,
        },
        200,
      ),
    ),
  );
}
