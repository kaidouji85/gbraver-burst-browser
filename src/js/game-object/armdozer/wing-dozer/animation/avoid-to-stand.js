// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {WingDozerSounds} from "../sounds/wing-dozer-sounds";
import {all} from "../../../../animation/all";

/**
 * 避け -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function avoidToStand(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'BACK_STEP';
    model.animation.frame = 1;
    sounds.motor.play();
  })
    .chain(all(
      tween(model.animation, t => t.to({frame: 0}, 400)),
      tween(model.position, t => t.to({x: '-100'}, 400))
    ))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}