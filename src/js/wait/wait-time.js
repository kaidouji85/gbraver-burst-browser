// @flow

/**
 * 指定した時間だけ待つ
 *
 * @param ms 待ち時間(ミリ秒)
 * @return 待機Promise
 */
export function waiTime(ms: number): Promise<void> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}