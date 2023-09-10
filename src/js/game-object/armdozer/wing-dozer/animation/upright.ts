import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/**
 * 気をつけ
 * @param model ウィングドーザモデル
 * @param sounds ウィングドーザサウンド
 * @return アニメーション
 */
export function upright(
  model: WingDozerModel,
  sounds: WingDozerSounds,
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
