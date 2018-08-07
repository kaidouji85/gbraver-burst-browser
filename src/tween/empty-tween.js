// @flow

import {Tween} from '@tweenjs/tween.js';

/** 0秒で終了するtweenを生成する */
export function createEmptyTween(): Tween {
  return new Tween({}).to({}, 0);
}