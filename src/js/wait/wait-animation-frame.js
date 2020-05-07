// @flow

/**
 * 1animation frame待機する
 *
 * @return 実行結果
 */
export function waitAnimationFrame(): Promise<void> {
  return new Promise(resolve => {
    requestAnimationFrame(time => {
      resolve();
    });
  });
}