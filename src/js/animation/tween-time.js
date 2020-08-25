// @flow

import TWEEN from '@tweenjs/tween.js';

/** Tween単体の再生時間を計算する */
export function tweenTime(tween: typeof TWEEN.Tween): number {
  return tween._duration + tween._delayTime + tween._repeat * tween._duration;
}