import { Animate } from "./animate";
import { tweenDuration } from "./duration";
import { GBTween } from "./gb-tween";

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
 * @returns アニメーション
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function tween<T extends Record<string, any>>(
  model: T,
  create: (t: GBTween<any>) => GBTween<any>,
): Animate {
  /* eslint-enable */
  const origin = new GBTween(model);
  const t = create(origin);
  return new Animate(t, t, [t], tweenDuration(origin));
}
