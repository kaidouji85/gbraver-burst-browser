import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/**
 * ガッツ -> 立ち
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function gutsToStand(model: ShinBraverModel, sounds: ShinBraverSounds): Animate {
  return process(() => {
    model.animation.type = "GUTS_DOWN";
    model.animation.frame = 1;
    sounds.motor.play();
  }).chain(tween(model.animation, t => t.to({
    frame: 0
  }, 200))).chain(process(() => {
    model.animation.type = "GUTS_UP";
    model.animation.frame = 1;
  })).chain(delay(500)).chain(process(() => {
    sounds.motor.play();
  })).chain(tween(model.animation, t => t.to({
    frame: 0
  }, 200))).chain(process(() => {
    model.animation.type = "STAND";
    model.animation.frame = 0;
  }));
}