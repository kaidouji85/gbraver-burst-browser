// @flow

import type {SafeAreaInset} from "../../safe-area/safe-area-inset";
import {createSafeAreaInset} from "../../safe-area/safe-area-inset";
import {fromEvent, Observable} from "rxjs";
import {map} from "rxjs/operators";
import {getHeight, getWidth} from "../../screen-size/screen-size";

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

