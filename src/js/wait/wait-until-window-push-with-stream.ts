import { first, Observable, Unsubscribable } from "rxjs";

import { SignalContainer } from "../abort-cntroller/signal-container";
import { PushWindow } from "../window/push-window";

/**
 * 画面を押下するまで待機する
 * 本関数は他ヘルパー関数で利用することを想定している
 * @param pushWindow 画面押下ストリーム
 * @param options オプション
 * @returns 画面押下したら発火するPromise
 */
export function waitUntilWindowPushWithStream(
  pushWindow: Observable<PushWindow>,
  options?: Partial<SignalContainer>,
): Promise<void> {
  const signal = options?.signal;
  let unsubscriber: Unsubscribable | null = null;
  let onAbort: (() => void) | null = null;
  let onCleanupOfAbort: (() => void) | null = null;

  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    onAbort = () => reject(signal?.reason);
    signal?.addEventListener("abort", onAbort);

    onCleanupOfAbort = () =>
      signal && onAbort && signal.removeEventListener("abort", onAbort);

    unsubscriber = pushWindow.pipe(first()).subscribe((action) => {
      action.event.preventDefault();
      resolve();
    });
  }).finally(() => {
    onCleanupOfAbort?.();
    unsubscriber?.unsubscribe();
  });
}
