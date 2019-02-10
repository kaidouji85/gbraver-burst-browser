// @flow

import {Animate} from "../../../../animation/animate";
import type {SparkModel} from "../model/spark-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

/** ヒットマークを表示する */
export function popUp(model: SparkModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.opacity = 1;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 1200)
    )
  ).chain(process(() => {
    model.opacity = 0;
  }));
}