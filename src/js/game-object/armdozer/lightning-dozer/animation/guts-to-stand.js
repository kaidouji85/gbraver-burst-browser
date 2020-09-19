// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";

/**
 * ターンスタート -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function gutsToStand(model: LightningDozerModel, sounds: LightningDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'GUTS_TO_STAND';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 400)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
  }));
}