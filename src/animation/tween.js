// @flow

import {Animate} from "./animate";
import {Tween, Group} from '@tweenjs/tween.js';

/**
 * Tween単体からTweenAnimationを生成する
 *
 * (使用例)
 * const model = {x: 100, y: 100};
 * tween(model, t => t
 *   .to({x: 200}, 100)
 * )
 *
 * @param model tweenさせるオブジェクト
 * @param create Tween生成関数
 * @param group Tweenグループ
 * @return アニメーション
 */
export function tween<T>(model: T, create: (t: Tween) => Tween, group: ?Group): Animate {
  const origin = new Tween(model, group);
  const t = create(origin);
  return new Animate(origin, origin);
}