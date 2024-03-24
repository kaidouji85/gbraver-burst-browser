import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import { NeoLandozerModel } from "../model/neo-landozer-model";
import { NeoLandozerSounds } from "../sounds/neo-landozer-sounds";

/**
 * 気をつけ
 * @param model ネオランドーザモデル
 * @param sounds ネオランドーザサウンド
 * @return アニメーション
 */
export function upright(
  model: NeoLandozerModel,
  sounds: NeoLandozerSounds,
): Animate {
  return onStart(() => {
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
