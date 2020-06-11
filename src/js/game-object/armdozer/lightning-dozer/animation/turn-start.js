// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";

/**
 * ターンスタート
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function turnStart(model: LightningDozerModel, sounds: LightningDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'GUTS_UP';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)))
    .chain(delay(300))
    .chain(process(() => {
      model.animation.type = 'GUTS_DOWN';
      model.animation.frame = 0;
      sounds.motor.play();
    }))
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}