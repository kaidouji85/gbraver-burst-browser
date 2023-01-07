import { all } from "../../../../animation/all";
import { Animate } from "../../../../animation/animate";
import { delay } from "../../../../animation/delay";
import { process } from "../../../../animation/process";
import { tween } from "../../../../animation/tween";
import type { ShinBraverModel } from "../model/shin-braver-model";
import { ShinBraverSounds } from "../sounds/shin-braver-sounds";

/**
 * 避け -> 立ち
 *
 * @param model モデル
 * @param sounds 効果音
 * @param distance 移動距離を絶対値で指定する
 * @return アニメーション
 */
export function frontStep(model: ShinBraverModel, sounds: ShinBraverSounds, distance: number = 100): Animate {
  return process(() => {
    model.animation.type = "FRONT_STEP";
    model.animation.frame = 0;
    sounds.motor.play();
  }).chain(all(tween(model.animation, t => t.to({
    frame: 1
  }, 300)), tween(model.position, t => t.to({
    x: `-${Math.abs(distance)}`
  }, 300)))).chain(delay(300)).chain(process(() => {
    sounds.motor.play();
  })).chain(tween(model.animation, t => t.to({
    frame: 0
  }, 300))).chain(process(() => {
    model.animation.type = "STAND";
    model.animation.frame = 0;
  }));
}