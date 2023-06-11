import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  stages: HTMLElement;
  imageCuts: HTMLElement;
  prevButton: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const stages: HTMLElement =
    root.querySelector(`[data-id="${ids.stages}"]`) ??
    document.createElement("div");
  const imageCuts: HTMLElement =
    root.querySelector(`[data-id="${ids.imageCuts}"]`) ??
    document.createElement("div");
  const prevButton: HTMLElement =
    root.querySelector(`[data-id="${ids.prevButton}"]`) ??
    document.createElement("div");
  return {
    stages,
    imageCuts,
    prevButton,
  };
}
