import { Observable } from "rxjs";

import type { SafeAreaInset } from "../safe-area/safe-area-inset";
import { createSafeAreaInset } from "../safe-area/safe-area-inset";
import {
  getViewPortHeight,
  getViewPortWidth,
} from "../view-port/view-port-size";

/** リサイズ */
export type Resize = {
  type: "resize";
  width: number;
  height: number;
  safeAreaInset: SafeAreaInset;
};

/**
 * リサイズストリームを生成する
 *
 * @returns ストリーム
 */
export function resizeStream(): Observable<Resize> {
  return new Observable<Resize>((subscriber) => {
    window.addEventListener("resize", () => {
      subscriber.next({
        type: "resize",
        width: getViewPortWidth(),
        height: getViewPortHeight(),
        safeAreaInset: createSafeAreaInset(),
      });
    });
  });
}
