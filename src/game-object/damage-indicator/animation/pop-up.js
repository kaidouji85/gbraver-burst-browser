// @flow

import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import {Group, Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../animation/tween-animation";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";

export function popUp(model: DamageIndicatorModel, group: Group, damage: number): TweenAnimation {
  return tween(new Tween(model, group)
    .to({opacity: 0, damage: damage}, 0)
  ).chain(
    tween(new Tween(model, group)
      .to({opacity: 1}, 300)
    )
  ).chain(
    delay(1000)
  ).chain(
    tween(new Tween(model, group)
      .to({opacity: 0}, 300)
    )
  );
}