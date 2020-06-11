// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";
import {all} from "../../../../animation/all";

/**
 * 避け
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function avoid(model: LightningDozerModel, sounds: LightningDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'BACK_STEP';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(all(
      tween(model.position, t => t.to({x: '+40'}, 200)),
      tween(model.animation, t => t.to({frame: 1}, 200)),
    ));
}