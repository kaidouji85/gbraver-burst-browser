import {Group, Tween} from "@tweenjs/tween.js";

import { Animate } from "./animate";
import { tweenDuration } from "./duration";

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
export function tween<T extends Record<string, any>>(model: T, create: (t: Tween<any>) => Tween<any>, group?: Group): Animate {
  const origin = new Tween(model, group);
  const t = create(origin);
  return new Animate(t, t, tweenDuration(origin));
}