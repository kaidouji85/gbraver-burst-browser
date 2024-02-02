import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/**
 * 礼（倒れる）
 * @param model ウィングドーザモデル
 * @param sounds ウィングドーザサウンド
 * @return アニメーション
 */
export function bowDown(
  model: WingDozerModel,
  sounds: WingDozerSounds,
): Animate {
  return onStart(() => {
    model.animation.type = "BOW";
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
