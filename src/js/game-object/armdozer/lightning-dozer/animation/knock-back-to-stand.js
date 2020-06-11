// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";

/**
 * ノックバック -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function knockBackToStand(model: LightningDozerModel, sounds: LightningDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'KNOCK_BACK';
    model.animation.frame = 1;
    sounds.motor.play();
  }).chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}