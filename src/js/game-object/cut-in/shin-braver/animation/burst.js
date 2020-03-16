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
      model.position.y = 0;
      model.scale = 0.9;
    }).chain(all(
      tween(model, t => t.to({scale: 1.2}, 300)),
      tween(model.position, t => t.to({y: 80}, 300)),
    )).chain(delay(200)
    ).chain(all(
      tween(model, t => t.to({scale: 1.2}, 300)),
      tween(model.position, t => t.to({y: 0}, 300)),
    )),

    process(() => {
      model.animation.type = 'BurstCharge';
      model.animation.frame = 0;
    }).chain(tween(model.animation, t => t.to({frame: 1}, 300))
    ).chain(delay(200)
    ).chain(process(() => {
      model.animation.type = 'BurstRelease';
      model.animation.frame = 0;
    })).chain(tween(model.animation, t => t.to({frame: 1}, 200)))
  )).chain(delay(1000)
  ).chain(process( () => {
    model.opacity = 0;
  }));
}