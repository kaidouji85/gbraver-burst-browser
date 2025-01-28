import { SignalContainer } from "../abort-cntroller/signal-container";

/**
 * 指定した時間だけ待つ
 * @param ms 待ち時間(ミリ秒)
 * @param options オプション
 * @returns 待機Promise
 */
export function waitTime(
  ms: number,
  options?: Partial<SignalContainer>,
): Promise<void> {
  const signal = options?.signal;
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

    setTimeout(() => {
      resolve();
    }, ms);
  }).finally(() => {
    onCleanupOfAbort?.();
  });
}
