import { Animate } from "../../../../animation/animate";
import { onStart } from "../../../../animation/on-start";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/**
 * ノックバック -> 立ち
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function knockBackToStand(
  model: ShinBraverModel,
  sounds: ShinBraverSounds,
): Animate {
  return onStart(() => {
    model.animation.frame = 1;
    model.animation.type = "KNOCK_BACK";
    sounds.motor.sound.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 0,
          },
          300,
        ),
      ),
    )
    .chain(
      onStart(() => {
        model.animation.frame = 0;
        model.animation.type = "STAND";
      }),
    );
}
