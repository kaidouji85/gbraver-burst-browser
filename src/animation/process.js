// @flow

import {TweenAnimation} from './tween-animation';
import {Tween, Group} from '@tweenjs/tween.js';
import {tween} from "./tween";

/**
 * アニメーション中に任意処理を行う
 *
 * @param fn 処理内容
 * @param group TWeenGroup
 * @return アニメーション
 */
export function process(fn: () => void, group: ?Group): TweenAnimation {
  return tween(new Tween({}, group)
    .to({}, 0)
    .onStart(() => {
      fn();
    })
  );
}