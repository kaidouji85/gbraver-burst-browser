// @flow

import {TweenAnimation} from './tween-animation';
import {Tween, Group} from '@tweenjs/tween.js';
import {tween} from "./tween";

export function process(fn: () => void, group: ?Group): TweenAnimation {
  return tween(new Tween({}, group)
    .to({}, 0)
    .onStart(() => {
      fn();
    })
  );
}