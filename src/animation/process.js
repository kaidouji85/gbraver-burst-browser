// @flow

import {TweenAnimation} from './tween-animation';
import {Tween, Group} from '@tweenjs/tween.js';

export function process(fn: () => void, group: ?Group): TweenAnimation {
  return new TweenAnimation(new Tween({}, group)
    .to({}, 0)
    .onStart(() => {
      fn();
    })
  );
}