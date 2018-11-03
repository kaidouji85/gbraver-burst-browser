// @flow

import {TweenAnimation} from "./tween-animation";
import {Tween, Group} from '@tweenjs/tween.js';
import {tween} from "./tween";

export function delay(time: number, group: ?Group): TweenAnimation {
  return tween(new Tween({}, group)
    .to({}, time)
  );
}

export function empty(): TweenAnimation {
  return delay(0);
}