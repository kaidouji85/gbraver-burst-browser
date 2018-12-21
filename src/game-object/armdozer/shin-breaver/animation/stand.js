// @flow

import {ShinBraverModel} from "../model/shin-braver-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** 立ちポーズになる */
export function stand(model: ShinBraverModel): Animate {
  return tween(model.animation, t => t
    .to({frame: 0}, 1000)
  ).chain(
    process(() => {
      model.animation.type = 'STAND';
    })
  );
}