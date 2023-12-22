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
 * リサイズストリーム発火を遅らせる時間（ミリ秒）
 * ios Safariだと、リサイズ発火直後には正しいビューポートの値が取れない
 * なので、少しだけの時間待つ
 */
export const RESIZE_DELAY = 50;

/**
 * リサイズストリームを生成する
 *
 * @return ストリーム
 */
export function resizeStream(): Observable<Resize> {
  return new Observable<Resize>((subscriber) => {
    window.addEventListener("resize", () => {
      console.log("resize fire", getViewPortWidth(), getViewPortHeight());  //TODO 原因調査が終わったら削除する
      setTimeout(() => {
        console.log(getViewPortWidth(), getViewPortHeight());               //TODO 原因調査が終わったら削除する
        subscriber.next({
          type: "resize",
          width: getViewPortWidth(),
          height: getViewPortHeight(),
          safeAreaInset: createSafeAreaInset(),
        });
      }, RESIZE_DELAY);
    });
  });
}
