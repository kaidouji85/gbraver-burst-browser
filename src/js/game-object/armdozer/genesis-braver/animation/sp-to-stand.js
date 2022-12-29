// @flow

import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import type { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/**
 * ストレートパンチ -> 立ち
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function spToStand(
  model: GenesisBraverModel,
  sounds: GenesisBraverSounds
): Animate {
  return process(() => {
    model.animation.type = "SP_TO_STAND";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  })
    .chain(
      tween(model.animation, (t) => t.to({ frame: 1 }, 400)),
      tween(model.position, (t) => t.to({ x: "+80" }, 400))
    )
    .chain(
      process(() => {
        model.animation.type = "STAND";
        model.animation.frame = 0;
      })
    );
}
