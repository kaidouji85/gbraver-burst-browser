// @flow

import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import type {BatterySelectorModel} from "../model";

export function decide(model: BatterySelectorModel): Animate {
  return tween(model, t => t.to({scale: 1.1}, 100))
    .chain(tween(model, t => t.to({scale: 1}, 100)))
}