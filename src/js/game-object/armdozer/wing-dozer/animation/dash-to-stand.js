// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {WingDozerSounds} from "../sounds/wing-dozer-sounds";

/**
 * ダッシュ -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function dashToStand(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'DASH_TO_STAND';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 400)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }))
}