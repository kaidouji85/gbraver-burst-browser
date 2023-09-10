import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/**
 * 気をつけ
 * @param model シンブレイバーモデル
 * @param sounds シンブレイバーサウンド
 * @return アニメーション
 */
export function upright(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return process(() => {
    model.animation.type = "UPRIGHT";
    model.animation.frame = 0;
    sounds.motor.play();
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
