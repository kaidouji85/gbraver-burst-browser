// @flow

import {TweenAnimation} from "./tween-animation";
import {Tween, Group} from '@tweenjs/tween.js';
import {tween} from "./tween";

/**
 * 指定した時間、何もしないアニメーション
 *
 * @param time 停止時間(ms)
 * @param group TweenGroup
 * @return アニメーション
 */
export function delay(time: number, group: ?Group): TweenAnimation {
  return tween(new Tween({}, group)
    .to({}, time)
  );
}

/**
 * 何もしないアニメーションを返す
 *
 * @return アニメーション
 */
export function empty(): TweenAnimation {
  return delay(0);
}