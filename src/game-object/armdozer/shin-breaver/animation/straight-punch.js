// @flow

import type {ShinBraverModel} from "../model/shin-braver-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {Animate} from "../../../../animation/animate";
import {delay} from "../../../../animation/delay";
import {all} from '../../../../animation/all';

/** ストレートパンチ */
export function straightPunch(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'SP_CHARGE';
    model.animation.frame = 0;
  }).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 250)
    )
  ).chain(
    delay(300)
  ).chain(
    process(() => {
      model.animation.type = 'SP_ATTACK';
      model.animation.frame = 0;
    })
  ).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 250)
    ),
    tween(model.position, t => t
      .to({x: '-80'}, 250)
    ),
  ).chain(
    delay(400)
  ).chain(
    process(() => {
      model.animation.type = 'SP_TO_STAND';
      model.animation.frame = 0;
    })
  ).chain(
    tween(model.animation, t => t
      .to({frame: 1}, 400)
    ),
    tween(model.position, t => t
      .to({x: '+80'}, 400)
    ),
  ).chain(
    process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    })
  );
}