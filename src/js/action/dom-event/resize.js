// @flow

import type {SafeAreaInset} from "../../safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../safe-area/safe-area-inset";
import {fromEvent, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {getScreenHeight, getScreenWidth} from "../../screen-size/screen-size";

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
          width: getScreenWidth(),
          height: getScreenHeight(),
          safeAreaInset: createSafeAreaInset(),
        });
      }, 50);
    })
  });
}