// @flow

import {Animate} from "./animate";
import {Tween} from '@tweenjs/tween.js';

/**
 * Tween単体からTweenAnimationを生成する
 *
 * @param origin オリジナルのTween
 * @return アニメーション
 */
export function tween(origin: Tween): Animate {
  return new Animate(origin, origin);
}