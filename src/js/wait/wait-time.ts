/**
 * 指定した時間だけ待つ
 *
 * @param ms 待ち時間(ミリ秒)
 * @returns 待機Promise
 */
export function waitTime(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}
