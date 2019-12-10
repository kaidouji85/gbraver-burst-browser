// @flow

import type {SafeAreaInset} from "../../safe-area/safe-area-inset";
import {fromEvent, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {createSafeAreaInset} from "../../safe-area/safe-area-inset";

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
  return fromEvent(window, 'resize').pipe(
    map(() => ({
      type: 'resize',
      width: getWidth(),
      height: getHeight(),
      safeAreaInset: createSafeAreaInset(),
    }))
  );
}

/**
 * リサイズ時の画面幅を取得する
 *
 * @return 画面幅
 */
export function getWidth(): number {
  if (document.documentElement) {
    // iOS Chromeではリサイズイベント発火後に、window.innerWidthに正しい値が反映されないが、
    // document.documentElement.clientWidthは正しく値が取得できる
    return document.documentElement.clientWidth;
  }

  // document.documentElementが存在しないことが理論上あるので、
  // その時にはwindow.innerWidthを使う
  return window.innerWidth;
}

/**
 * リサイズ時の画面高を取得する
 *
 * @return 画面高
 */
export function getHeight(): number {
  if (document.documentElement) {
    // iOS Chromeではリサイズイベント発火後に、window.innerHeightに正しい値が反映されないが、
    // document.documentElement.clientHeightは正しく値が取得できる

    return document.documentElement.clientHeight;
  }

  // document.documentElementが存在しないことが理論上あるので、
  // その時にはwindow.innerHeightを使う
  return window.innerHeight;
}