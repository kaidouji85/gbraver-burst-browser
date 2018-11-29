// @flow

import {ShinBraverModel} from "../model/shin-braver-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";

/** 立ちポーズになる */
export function stand(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.animation.type = 'STAND';
  });
}