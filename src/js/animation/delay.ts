import { Animate } from "./animate";
import { tween } from "./tween";

/**
 * 指定した時間、何もしないアニメーション
 *
 * @param time 停止時間(ms)
 * @returns アニメーション
 */
export function delay(time: number): Animate {
  return tween({}, (t) => t.to({}, time));
}

/**
 * 何もしないアニメーションを返す
 *
 * @returns アニメーション
 */
export function empty(): Animate {
  return delay(0);
}
