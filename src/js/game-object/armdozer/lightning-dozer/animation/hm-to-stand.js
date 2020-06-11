// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {all} from "../../../../animation/all";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";

/**
 * アームハンマー -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function hmToStand(model: LightningDozerModel, sounds: LightningDozerSounds): Animate {
  return all(
    process(() => {
      model.animation.type = 'HM_TO_STAND';
      model.animation.frame = 0;
      sounds.motor.play();
    })
      .chain(tween(model.animation, t => t.to({frame: 1}, 400)))
      .chain(process(() => {
        model.animation.type = 'STAND';
        model.animation.frame = 0;
      })),

    tween(model.position, t => t.to({x: '+60'}, 400))
  );
}
