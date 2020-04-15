// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

/**
 * バースト -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function burstToStand(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'BURST_DOWN';
    model.animation.frame = 1;
  }).chain(tween(model.animation, t => t.to({frame: 0}, 300))
  ).chain(process(() => {
      model.animation.type = 'BURST_UP';
      model.animation.frame = 1;
    })
  ).chain(delay(200)
  ).chain(tween(model.animation, t => t.to({frame: 0}, 300))
  ).chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}