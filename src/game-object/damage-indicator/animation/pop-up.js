// @flow

import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import {Group, Tween} from '@tweenjs/tween.js';

export function popUp(model: DamageIndicatorModel, group: Group, damage: number): MultiTween {
  const start = new Tween(model, group)
    .to({
      opacity: 0,
      damage: damage
    }, 0);
  const visible = new Tween(model, group)
    .to({opacity: 1}, 300);
  const wait = new Tween({}, group)
    .to({}, 1000);
  const invisible = new Tween(model, group)
    .to({opacity: 0}, 300);

  start.chain(visible);
  visible.chain(wait);
  wait.chain(invisible);

  return {
    start: start,
    end: invisible
  };
}