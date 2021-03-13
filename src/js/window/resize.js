// @flow

import type {SafeAreaInset} from "../safe-area/safe-area-inset";
import {createSafeAreaInset} from "../safe-area/safe-area-inset";
import {Observable} from "rxjs";
import {getViewPortHeight, getViewPortWidth} from "../view-port/view-port-size";
import type {Stream} from "../stream/core";
import {toStream} from "../stream/rxjs";

/** リサイズ */
export type Resize = {
  type: 'resize',
  width: number,
  height: number,
  safeAreaInset: SafeAreaInset,
};

/**
 * リサイズストリーム発火を遅らせる時間（ミリ秒）
 * ios Safariだと、リサイズ発火直後には正しいビューポートの値が取れない
 * なので、少しだけの時間待つ
 */
export const RESIZE_DELAY = 50;

/**
 * @deprecated
 * リサイズストリームを生成する
 *
 * @return ストリーム
 */
export function deprecated_createResizeStream(): Observable<Resize> {
  return new Observable(subscriber => {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        subscriber.next({
          type: 'resize',
          width: getViewPortWidth(),
          height: getViewPortHeight(),
          safeAreaInset: createSafeAreaInset(),
        });
      }, RESIZE_DELAY);
    })
  });
}

/**
 * リサイズストリームを生成する
 *
 * @return ストリーム
 */
export function resizeStream(): Stream<Resize> {
  const origin = new Observable(subscriber => {
    window.addEventListener('resize', () => {
      setTimeout(() => {
        subscriber.next({
          type: 'resize',
          width: getViewPortWidth(),
          height: getViewPortHeight(),
          safeAreaInset: createSafeAreaInset(),
        });
      }, RESIZE_DELAY);
    })
  });
  return toStream(origin);
}