/**
 * ルート要素から背景を抽出する
 * @param root ルート要素
 * @return 抽出結果
 */
export function extractBackGround(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="backGround"]`) ??
    document.createElement("div")
  );
}

/**
 * ルート要素からクローザーを抽出する
 * @param root ルート要素
 * @return 抽出結果
 */
export function extractCloser(root: HTMLElement): HTMLImageElement {
  const closerElement = root.querySelector(`[data-id="closer"]`);
  return closerElement instanceof HTMLImageElement
    ? closerElement
    : document.createElement("img");
}

/**
 * ルート要素からアカウント削除ボタンを抽出する
 * @param root ルート要素
 * @return 抽出結果
 */
export function extractDeleteAccountButton(
  root: HTMLElement,
): HTMLButtonElement {
  const deleteAccountButtonElement = root.querySelector(
    `[data-id="deleteAccountButton"]`,
  );
  return deleteAccountButtonElement instanceof HTMLButtonElement
    ? deleteAccountButtonElement
    : document.createElement("button");
}

/**
 * ルート要素から閉じるボタンを抽出する
 * @param root ルート要素
 * @return 抽出結果
 */
export function extractCloseButton(root: HTMLElement): HTMLButtonElement {
  const closeButtonElement = root.querySelector(`[data-id="closeButton"]`);
  return closeButtonElement instanceof HTMLButtonElement
    ? closeButtonElement
    : document.createElement("button");
}
