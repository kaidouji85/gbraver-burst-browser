// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";
import {all} from "../../../../animation/all";
import {delay} from "../../../../animation/delay";

/**
 * フロントステップ
 *
 * @param model モデル
 * @param sounds 音
 * @param distance 移動距離を絶対値で指定する
 * @return アニメーション
 */
export function frontStep(model: LightningDozerModel, sounds: LightningDozerSounds, distance: number = 100): Animate {
  return process(() => {
      model.animation.type = 'FRONT_STEP';
      model.animation.frame = 0;
      sounds.motor.play();
    })
    .chain(all(
      tween(model.animation, t => t.to({frame: 1}, 300)),
      tween(model.position, t => t.to({x: `-${Math.abs(distance)}`}, 300))
    ))
    .chain(delay(300))
    .chain(process(() => {
      sounds.motor.play();
    }))
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}