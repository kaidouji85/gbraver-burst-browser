// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {WingDozerSounds} from "../sounds/wing-dozer-sounds";

/**
 * 避け
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function avoid(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'BACK_STEP';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}