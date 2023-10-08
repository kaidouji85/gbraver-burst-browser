import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** チェック */
  checker: HTMLInputElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const foundChecker = root.querySelector(`[data-id="${ids.checker}"]`);
  const checker: HTMLInputElement =
    foundChecker instanceof HTMLInputElement ? foundChecker : document.createElement("input");
  return {
    checker,
  };
}
