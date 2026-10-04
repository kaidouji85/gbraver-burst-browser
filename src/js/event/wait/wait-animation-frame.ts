/**
 * 1animation frame待機する
 *
 * @returns 実行結果
 */
export function waitAnimationFrame(): Promise<void> {
  return new Promise((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });
}
