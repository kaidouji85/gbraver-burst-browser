import { Group, Tween } from "@tweenjs/tween.js";

import { Animate } from "./animate";
import { tweenDuration } from "./duration";
import { GlobalTweenGroup } from "./global-tween-group";

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
  create: (t: Tween<any>) => Tween<any>,
  group?: Group,
): Animate {
  /* eslint-enable */
  const origin = new Tween(model);
  const t = create(origin);
  const targetGroup = group ?? GlobalTweenGroup;
  targetGroup.add(origin);
  return new Animate(t, t, tweenDuration(origin));
}
