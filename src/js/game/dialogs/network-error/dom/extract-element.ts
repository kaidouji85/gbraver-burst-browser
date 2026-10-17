/**
 * ルート要素からネットワークエラー後のボタン要素を抽出する
 * @param root ルート要素
 * @returns ネットワークエラー後のボタン要素
 */
export const extractPostNetworkErrorButton = (
  root: HTMLElement,
): HTMLButtonElement => {
  const found = root.querySelector("button");
  return found instanceof HTMLButtonElement
    ? found
    : document.createElement("button");
};
