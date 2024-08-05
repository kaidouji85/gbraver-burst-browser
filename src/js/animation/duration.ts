import { Tween } from "@tweenjs/tween.js";

/**
 * Tween単体の再生時間を計算する
 *
 * @returns 再生時間
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function tweenDuration(tween: Tween<any>): number {
  return (
    (tween as any)._duration +
    (tween as any)._delayTime +
    (tween as any)._repeat * (tween as any)._duration
  );
  /* eslint-enable */
}
