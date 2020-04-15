// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

/**
 * バースト
 *
 * @param model モデル
 * @return アニメーション
 */
export function burst(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'BURST_UP';
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({frame: 1}, 200))
  ).chain(delay(500)
  ).chain(process(() => {
      model.animation.type = 'BURST_DOWN';
      model.animation.frame = 0;
    })
  ).chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}