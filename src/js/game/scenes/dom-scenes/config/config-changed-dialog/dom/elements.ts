import type { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  backGround: HTMLElement;
  closer: HTMLElement;
  discard: HTMLElement;
  accept: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const backGround: HTMLElement =
    root.querySelector(`[data-id="${ids.backGround}"]`) ??
    document.createElement("div");
  const closer: HTMLElement =
    root.querySelector(`[data-id="${ids.closer}"]`) ??
    document.createElement("div");
  const discard: HTMLElement =
    root.querySelector(`[data-id="${ids.discard}"]`) ??
    document.createElement("div");
  const accept: HTMLElement =
    root.querySelector(`[data-id="${ids.accept}"]`) ??
    document.createElement("div");
  return {
    backGround,
    closer,
    discard,
    accept,
  };
}
