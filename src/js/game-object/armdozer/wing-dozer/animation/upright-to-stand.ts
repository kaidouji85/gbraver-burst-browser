import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/**
 * 気をつけ -> 立ち
 * @param model ウィングドーザモデル
 * @param sounds ウィングドーザサウンド
 * @return アニメーション
 */
export function uprightToStand(
  model: WingDozerModel,
  sounds: WingDozerSounds,
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
