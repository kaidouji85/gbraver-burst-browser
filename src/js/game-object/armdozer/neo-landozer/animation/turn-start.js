// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';

export function turnStart(model: NeoLandozerModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS';
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}