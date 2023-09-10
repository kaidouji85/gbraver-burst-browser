import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/**
 * 気をつけ -> 立ち
 * @param model シンブレイバーモデル
 * @param sounds シンブレイバーサウンド
 * @return アニメーション
 */
export function uprightToStand(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return process(() => {
    model.animation.type = "UPRIGHT";
    model.animation.frame = 1;
    sounds.motor.play();
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
        model.animation.type = "STAND";
        model.animation.frame = 0;
      }),
    );
}
