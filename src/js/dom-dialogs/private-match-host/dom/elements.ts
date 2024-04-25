import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** クロージャ */
  closer: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const closer: HTMLElement =
    root.querySelector(`[data-id="${ids.closer}"]`) ??
    document.createElement("div");
  return { closer };
}
