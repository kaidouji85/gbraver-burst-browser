import type {MultiTween} from "./multi-tween";
import {Tween} from '@tweenjs/tween.js';

/**
 * 空のMultiTweenを生成する
 *
 * @return 空のMultiTween
 */
export function createEmptyMultiTween(): MultiTween {
  return {
    start: new Tween({}).to({}, 0),
    end: new Tween({}).to({}, 0),
  };
}