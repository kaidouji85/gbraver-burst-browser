import * as TWEEN from "@tweenjs/tween.js";

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
 * @returns アニメーション
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function tween<T extends Record<string, any>>(
  model: T,
  create: (t: TWEEN.Tween<any>) => TWEEN.Tween<any>,
  group?: TWEEN.Group,
): Animate {
  /* eslint-enable */
  const origin = new TWEEN.Tween(model, group);
  const t = create(origin);
  return new Animate(t, t, tweenDuration(origin));
}
