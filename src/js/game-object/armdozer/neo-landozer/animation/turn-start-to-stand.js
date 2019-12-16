// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

export function turnStartToStand(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS';
    model.animation.frame = 1;
  }).chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}