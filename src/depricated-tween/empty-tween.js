// @flow

import {Group, Tween} from '@tweenjs/tween.js';

/** 0秒で終了するtweenを生成する */
export function createEmptyTween(): Tween {
  return new Tween({}).to({}, 0);
}

/** 0秒で終了するtweenをグループ指定で生成する */
export function createEmptyTweenByGroup(group: Group): Tween {
  return new Tween({}, group).to({}, 0);
}