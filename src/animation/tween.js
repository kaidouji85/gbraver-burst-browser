// @flow

import {TweenAnimation} from "./tween-animation";
import {Tween} from '@tweenjs/tween.js';

export function tween(origin: Tween): TweenAnimation {
  return new TweenAnimation(origin, origin);
}