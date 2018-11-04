// @flow

import {TweenAnimation} from "./tween-animation";
import {Tween} from '@tweenjs/tween.js';

/**
 * Tween単体からTweenAnimationを生成する
 *
 * @param origin オリジナルのTween
 * @return アニメーション
 */
export function tween(origin: Tween): TweenAnimation {
  return new TweenAnimation(origin, origin);
}