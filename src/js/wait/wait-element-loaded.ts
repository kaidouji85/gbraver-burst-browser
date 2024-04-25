/**
 * HTML要素の読み込みが完了するまで待つ
 *
 * @param element 観測対象
 * @returns 待機結果
 */
export function waitElementLoaded(element: HTMLElement): Promise<void> {
  return new Promise((resolve) => {
    element.addEventListener("load", () => {
      resolve();
    });
  });
}
