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
  let onFinish: (() => void) | null = null;
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

    onFinish = () => resolve();
    animation.addEventListener("finish", onFinish);
  }).finally(() => {
    if (signal && onAbort) {
      signal.removeEventListener("abort", onAbort);
    }
    if (onFinish) {
      animation.removeEventListener("finish", onFinish);
    }
  });
}
