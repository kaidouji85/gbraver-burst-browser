/**
 * ルートHTML要素からクローザーを取得する
 * @param root ルートHTML要素
 * @returns 取得結果
 */
export function extractCloser(root: HTMLElement): HTMLImageElement {
  const closerElement = root.querySelector(`[data-id="closer"]`);
  return closerElement instanceof HTMLImageElement
    ? closerElement
    : document.createElement("img");
}

/**
 * ルートHTML要素から背景を取得する
 * @param root ルートHTML要素
 * @returns 取得結果
 */
export function extractBackGround(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="backGround"]`) ??
    document.createElement("div")
  );
}

/**
 * ルートHTML要素からログインボタンを取得する
 * @param root ルートHTML要素
 * @returns 取得結果
 */
export function extractLoginButton(root: HTMLElement): HTMLButtonElement {
  const loginButtonElement = root.querySelector(`[data-id="loginButton"]`);
  return loginButtonElement instanceof HTMLButtonElement
    ? loginButtonElement
    : document.createElement("button");
}

/**
 * ルートHTML要素から閉じるボタンを取得する
 * @param root ルートHTML要素
 * @returns 取得結果
 */
export function extractCloseButton(root: HTMLElement): HTMLButtonElement {
  const closeButtonElement = root.querySelector(`[data-id="closeButton"]`);
  return closeButtonElement instanceof HTMLButtonElement
    ? closeButtonElement
    : document.createElement("button");
}
