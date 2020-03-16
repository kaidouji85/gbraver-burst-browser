// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";
import {all} from "../../../../animation/all";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

/**
 * カットインアニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function burst(model: ShinBraverCutInModel): Animate {
  return process(() =>{
    model.opacity = 1;
  }).chain(all(
    process(() => {
      model.scale = 1;
    }).chain(
      tween(model, t => t.to({scale: 2}, 300))
    ).chain(
      delay(200)
    ).chain(
      tween(model, t => t.to({scale: 1}, 200))
    ),

    process(() => {
      model.animation.type = 'BurstCharge';
      model.animation.frame = 0;
    }).chain(
      tween(model.animation, t => t.to({frame: 1}, 300))
    ).chain(
      delay(200)
    ).chain(process(() => {
      model.animation.type = 'BurstRelease';
      model.animation.frame = 0;
    })).chain(
      tween(model.animation, t => t.to({frame: 1}, 200))
    )
  )).chain(
    delay(1000)
  );
}