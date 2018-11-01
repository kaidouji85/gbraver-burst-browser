import type {MultiTween} from "./multi-tween";
import {Tween} from '@tweenjs/tween.js';

/**
 * 空のMultiTweenを生成する
 *
 * @return 空のMultiTween
 */
export function createEmptyMultiTween(): MultiTween {
  const start = new Tween({}).to({}, 0);
  const end = new Tween({}).to({}, 0);
  start.chain(end);

  return {start, end};
}