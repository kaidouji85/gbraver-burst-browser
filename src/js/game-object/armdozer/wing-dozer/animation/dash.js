// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {delay} from "../../../../animation/delay";
import {WingDozerSounds} from "../sounds/wing-dozer-sounds";

/**
 * ダッシュ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function dash(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'DASH_UP';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)))
    .chain(delay(300))
    .chain(process(() => {
      model.animation.type = 'DASH_DOWN';
      model.animation.frame = 0;
      sounds.motor.play();
    }))
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}