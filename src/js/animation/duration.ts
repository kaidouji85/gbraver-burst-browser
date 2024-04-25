import * as TWEEN from "@tweenjs/tween.js";

/**
 * Tween単体の再生時間を計算する
 *
 * @returns 再生時間
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function tweenDuration(tween: TWEEN.Tween<any>): number {
  return (
    (tween as any)._duration +
    (tween as any)._delayTime +
    (tween as any)._repeat * (tween as any)._duration
  );
  /* eslint-enable */
}

/**
 * Tween再生時間をスケールする
 * また、chainしたTween再生時間もスケールする
 * 本関数には副作用がある
 *
 * 使用例)
 * const t1= new TWeen();
 * scaleTweenDuration(t1, 0.5);
 * // t1の再生時間が0,5倍される
 *
 * @param tween 再生時間を変更するTween
 * @param scale スケール係数
 * @param scaledTweens 再生時間スケールが完了したTween
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
export function scaleTweenDuration(
  tween: TWEEN.Tween<any>,
  scale: number,
  scaledTweens: TWEEN.Tween<any>[] = [],
): void {
  /* eslint-enable */
  if (scaledTweens.includes(tween)) {
    return;
  }

  const newScaledTweens = [...scaledTweens, tween];
  /* eslint-disable @typescript-eslint/no-explicit-any */
  (tween as any)._duration = (tween as any)._duration * scale;
  /* eslint-enable */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  (tween as any)._chainedTweens.forEach((child: TWEEN.Tween<any>) => {
    /* eslint-enable */
    scaleTweenDuration(child, scale, newScaledTweens);
  });
}
