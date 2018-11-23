// @flow

import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";

export function popUp(model: DamageIndicatorModel, damage: number): Animate {
  return tween(model, t => t
    .to({opacity: 0, damage: damage}, 0)
  ).chain(
    tween(model, t => t
      .to({opacity: 1}, 300)
    )
  ).chain(
    delay(1000)
  ).chain(
    tween(model, t => t
      .to({opacity: 0}, 300)
    )
  );
}