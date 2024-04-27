/**
 * キャプションを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export function extractCaption(root: HTMLElement): HTMLElement {
  return (
    root.querySelector(`[data-id="caption"]`) ?? document.createElement("div")
  );
}

/**
 * アームドーザアイコンを抽出する
 * @param root ルート要素
 * @returns 抽出結果
 */
export function extractArmdozerIcon(root: HTMLElement): HTMLImageElement {
  const foundArmdozerIcon = root.querySelector(`[data-id="armdozerIcon"]`);
  return foundArmdozerIcon instanceof HTMLImageElement
    ? foundArmdozerIcon
    : document.createElement("img");
}
