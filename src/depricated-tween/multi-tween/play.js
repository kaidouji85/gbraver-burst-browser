// @flow

import type {MultiTween} from "./multi-tween";

/**
 * MultiTweenを再生する
 *
 * @param multiTween 再生するMultiTween
 * @return 再生が終わったら発火するPromise
 */
export function play(multiTween: MultiTween): Promise<void> {
  return new Promise(resolve => {
    multiTween.end.onComplete(() => resolve());
    multiTween.start.start();
  });
}