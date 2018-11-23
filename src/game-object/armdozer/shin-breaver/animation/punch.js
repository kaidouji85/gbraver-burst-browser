// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {Animate} from "../../../../animation/animate";
import {tween} from "../../../../animation/tween";
import {process} from "../../../../animation/process";
import {delay} from "../../../../animation/delay";

/** パンチアニメーション */
export function punch(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'PUNCH';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 11/16}, 500)
    )
  ).chain(
   delay(1000)
  ).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 150)
      .repeat(1)
      .yoyo(true)
    )
  ).chain(
    delay(1000)
  ).chain(
    tween(model.animation, t => t
      .to({frame: 0}, 500)
    )
  ).chain(
    delay(1000)
  );
}