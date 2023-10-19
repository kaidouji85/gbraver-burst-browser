import { DataIDs } from "./data-ids";

/**
 * キャプションを抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractCaption(root: HTMLElement, ids: DataIDs): HTMLElement {
  return root.querySelector(`[data-id="${ids.caption}"]`) ?? 
    document.createElement("div");
}

/**
 * アームドーザアイコンを抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractArmdozerIcon(root: HTMLElement, ids: DataIDs): HTMLImageElement {
  const foundArmdozerIcon = root.querySelector(
    `[data-id="${ids.armdozerIcon}"]`,
  );
  return foundArmdozerIcon instanceof HTMLImageElement
    ? foundArmdozerIcon
    : document.createElement("img");
}