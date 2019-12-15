// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/** ターンスタート -> 立ち */
export function turnStartToStand(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS_TO_STAND';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t.to({frame: 1}, 300))
  ).chain(process(() => {
    model.animation.type = 'STAND';
    model.animation.frame = 0;
  }));
}