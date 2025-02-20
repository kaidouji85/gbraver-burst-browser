import { SignalContainer } from "../abort-controller/signal-container";

/**
 * アニメーションが完了するまで待機する
 * @param animation アニメーション
 * @param options オプション
 * @returns アニメーションPromise
 */
export function waitFinishAnimation(
  animation: Animation,
  options?: Partial<SignalContainer>,
): Promise<void> {
  let onAbort: (() => void) | null = null;
  const signal = options?.signal;
  return new Promise<void>((resolve, reject) => {
    if (signal?.aborted) {
      reject(signal.reason);
      return;
    }

    onAbort = () => {
      animation.pause();
      reject(signal?.reason);
    };
    signal?.addEventListener("abort", onAbort);

    animation.onfinish = () => {
      resolve();
    };
  }).finally(() => {
    if (signal && onAbort) {
      signal.removeEventListener("abort", onAbort);
    }
  });
}
