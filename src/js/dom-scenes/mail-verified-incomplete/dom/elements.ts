import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** タイトルへ */
  gotoTitle: HTMLElement;
  /** 再読み込み */
  reload: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const gotoTitle: HTMLElement =
    root.querySelector(`[data-id="${ids.gotoTitle}"]`) ??
    document.createElement("div");
  const reload: HTMLElement =
    root.querySelector(`[data-id="${ids.reload}"]`) ??
    document.createElement("div");
  return {
    gotoTitle,
    reload,
  };
}
