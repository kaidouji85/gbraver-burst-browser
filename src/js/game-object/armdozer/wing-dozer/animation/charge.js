// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {WingDozerSounds} from "../sounds/wing-dozer-sounds";

/**
 * チャージ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function charge(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'UPPER_CHARGE';
    model.animation.frame = 0;
    sounds.motor.play();
  }).chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}
