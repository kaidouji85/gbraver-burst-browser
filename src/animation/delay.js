// @flow

import {Animate} from "./animate";
import {tween} from "./tween";
import {Group} from '@tweenjs/tween.js';

/**
 * 指定した時間、何もしないアニメーション
 *
 * @param time 停止時間(ms)
 * @param group TweenGroup
 * @return アニメーション
 */
export function delay(time: number, group: ?Group): Animate {
  return tween({}, t => t.to({}, time), group)
}

/**
 * 何もしないアニメーションを返す
 *
 * @return アニメーション
 */
export function empty(): Animate {
  return delay(0);
}