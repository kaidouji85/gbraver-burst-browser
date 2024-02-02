import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { WingDozerModel } from "../model/wing-dozer-model";
import { WingDozerSounds } from "../sounds/wing-dozer-sounds";

/**
 * 礼（起き上がる）
 * @param model ウィングドーザモデル
 * @param sounds ウィングドーザサウンド
 * @return アニメーション
 */
export function bowUp(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return onStart(() => {
    model.animation.type = "BOW";
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
      onStart(() => {
        model.animation.type = "UPRIGHT";
        model.animation.frame = 1;
      }),
    );
}
