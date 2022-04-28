// @flow
import TWEEN from '@tweenjs/tween.js';

/**
 * Tween単体の再生時間を計算する
 *
 * @return 再生時間
 */
export function tweenDuration(tween: typeof TWEEN.Tween): number {
  return tween._duration + tween._delayTime + tween._repeat * tween._duration;
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
export function scaleTweenDuration(tween: typeof TWEEN.Tween, scale: number, scaledTweens: typeof TWEEN.Tween[] = []): void {
  if (scaledTweens.includes(tween)) {
    return;
  }
  const newScaledTweens = [...scaledTweens, tween];
  tween._duration = tween._duration * scale;
  tween._chainedTweens.forEach((child: typeof TWEEN.Tween) => {
    scaleTweenDuration(child, scale, newScaledTweens);
  });
}