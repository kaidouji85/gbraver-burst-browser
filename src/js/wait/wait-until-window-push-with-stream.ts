import { first, Observable } from "rxjs";

import type { PushWindow } from "../window/push-window";

/**
 * 画面を押下するまで待機する
 * 本関数は他ヘルパー関数で利用することを想定している
 * @param pushWindow 画面押下ストリーム
 * @returns 画面押下したら発火するPromise
 */
export function waitUntilWindowPushWithStream(
  pushWindow: Observable<PushWindow>,
): Promise<void> {
  return new Promise((resolve) => {
    const unsubscriber = pushWindow.pipe(first()).subscribe((action) => {
      action.event.preventDefault();
      unsubscriber.unsubscribe();
      resolve();
    });
  });
}
