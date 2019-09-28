// @flow

import TWEEN from '@tweenjs/tween.js';
import {Animate} from "./animate";
import {tweenTime} from "./tween-time";

/**
 * Tween単体からTweenAnimationを生成する
 *
 * (使用例)
 * const state = {x: 100, y: 100};
 * tween(state, t => t
 *   .to({x: 200}, 100)
 * )
 *
 * @param model tweenさせるオブジェクト
 * @param create Tween生成関数
 * @param group Tweenグループ
 * @return アニメーション
 */
export function tween<T>(model: T, create: (t: TWEEN.Tween) => TWEEN.Tween, group: ?TWEEN.Group): Animate {
  const origin = new TWEEN.Tween(model, group);
  const t = create(origin);
  return new Animate(t, t, tweenTime(origin));
}