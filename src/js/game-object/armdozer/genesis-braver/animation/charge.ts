import { Animate } from "../../../../animation/animate";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { GenesisBraverModel } from "../model/genesis-braver-model";
import type { GenesisBraverSounds } from "../sounds/genesis-braver-sounds";

/**
 * チャージ
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function charge(model: GenesisBraverModel, sounds: GenesisBraverSounds): Animate {
  return process(() => {
    model.animation.type = "SP_CHARGE";
    model.animation.frame = 0;
    sounds.motor.sound.play();
  }).chain(tween(model.animation, t => t.to({
    frame: 1
  }, 250)));
}