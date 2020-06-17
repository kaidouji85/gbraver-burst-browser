// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {WingDozerSounds} from "../sounds/wing-dozer-sounds";

/**
 * ガード -> 立ち
 *
 *  @param model モデル
 *  @param sounds 音
 *  @return アニメーション
 */
export function guardToStand(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return process(() => {
    model.animation.frame = 1;
    model.animation.type = 'GUARD';
    sounds.motor.play();
  }).chain(
    tween(model.animation, t => t
      .to({frame: 0}, 300)
    )
  ).chain(
    process(() => {
      model.animation.frame = 0;
      model.animation.type = 'STAND';
    })
  );
}