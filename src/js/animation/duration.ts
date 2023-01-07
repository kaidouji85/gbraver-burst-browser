import {Tween} from "@tweenjs/tween.js";

/**
 * Tween単体の再生時間を計算する
 *
 * @return 再生時間
 */
export function tweenDuration(tween: Tween<any>): number {
  return (tween as any)._duration + (tween as any)._delayTime + (tween as any)._repeat * (tween as any)._duration;
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
export function scaleTweenDuration(tween: Tween<any>, scale: number, scaledTweens: Tween<any>[] = []): void {
  if (scaledTweens.includes(tween)) {
    return;
  }

  const newScaledTweens = [...scaledTweens, tween];
  (tween as any)._duration = (tween as any)._duration * scale;

  (tween as any)._chainedTweens.forEach((child: Tween<any>) => {
    scaleTweenDuration(child, scale, newScaledTweens);
  });
}