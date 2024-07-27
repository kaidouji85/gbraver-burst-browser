import { Tween } from "@tweenjs/tween.js";

/**
 * Tweenの子孫を取得する
 * @param tween 取得対象のTween
 * @returns 子孫のTween
 */

/* eslint-disable @typescript-eslint/no-explicit-any */
export function getChildTween(tween: Tween<any>): Tween<any>[] {
  /* eslint-enable */

  /* eslint-disable @typescript-eslint/no-explicit-any */
  const chainedTweens: Tween<any>[] = (tween as any)._chainedTweens;
  /* eslint-enable */

  const children = chainedTweens.flatMap((child) => getChildTween(child));
  return [tween, ...children];
}
