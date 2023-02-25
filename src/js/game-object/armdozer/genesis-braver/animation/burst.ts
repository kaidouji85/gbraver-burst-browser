import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import {GenesisBraverModel} from "../model/genesis-braver-model";
import {GenesisBraverSounds} from "../sounds/genesis-braver-sounds";

/**
 * バースト
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function burst(
  model: GenesisBraverModel,
  sounds: GenesisBraverSounds
): Animate {
  return process(() => {
    model.animation.type = "BURST_UP";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  })
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          200
        )
      )
    )
    .chain(delay(500))
    .chain(
      process(() => {
        model.animation.type = "BURST_DOWN";
        model.animation.frame = 0;
        sounds.motor.sound.play();
      })
    )
    .chain(
      tween(model.animation, (t) =>
        t.to(
          {
            frame: 1,
          },
          200
        )
      )
    );
}
