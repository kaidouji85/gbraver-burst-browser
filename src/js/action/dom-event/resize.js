// @flow

import type {SafeAreaInset} from "../../safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../safe-area/safe-area-inset";
import {fromEvent, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {getViewPortHeight, getViewPortWidth} from "../../view-port/view-port-size";

/** リサイズ */
export type Resize = {
  type: 'resize',
  width: number,
  height: number,
  safeAreaInset: SafeAreaInset,
};

/**
 * リサイズストリームを生成する
 *
 * @return ストリーム
 */
export function createResizeStream(): Observable<Resize> {
  return new Observable(subscriber => {
    window.addEventListener('resize', e => {
      setTimeout(() => {
        subscriber.next({
          type: 'resize',
          width: getViewPortWidth(),
          height: getViewPortHeight(),
          safeAreaInset: createSafeAreaInset(),
        });
      }, 50);
    })
  });
}