import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { LightningDozerModel } from "../model/lightning-dozer-model";
import { LightningDozerSounds } from "../sounds/lightning-dozer-sounds";

/**
 * 礼（起き上がる）
 * @param model ライトニングドーザモデル
 * @param sounds ライトニングドーザサウンド
 * @return アニメーション
 */
export function bowUp(
  model: LightningDozerModel,
  sounds: LightningDozerSounds,
): Animate {
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
