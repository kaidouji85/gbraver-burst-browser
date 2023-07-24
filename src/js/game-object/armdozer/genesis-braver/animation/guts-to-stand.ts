import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import { GenesisBraverModel } from "../model/genesis-braver-model";
import { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/**
 * ガード -> 立ち
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function guardToStand(
  model: GenesisBraverModel,
  sounds: GenesisBraverSounds,
): Animate {
  return process(() => {
    model.animation.frame = 1;
    model.animation.type = "GUARD";
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
      process(() => {
        model.animation.frame = 0;
        model.animation.type = "STAND";
      }),
    );
}
