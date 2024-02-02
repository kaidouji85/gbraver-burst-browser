import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/**
 * 礼（起き上がる）
 * @param model ネオランドーザモデル
 * @param sounds ネオランドーザサウンド
 * @return アニメーション
 */
export function bowUp(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds,
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
