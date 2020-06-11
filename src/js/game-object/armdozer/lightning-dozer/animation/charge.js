// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";

/**
 * チャージ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function charge(model: LightningDozerModel, sounds: LightningDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'HM_CHARGE';
    model.animation.frame = 0;
    sounds.motor.play();
  }).chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}