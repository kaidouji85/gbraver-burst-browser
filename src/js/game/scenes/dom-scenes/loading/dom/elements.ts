import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** ローディング完了率のテキスト */
  text: HTMLElement;
  /** ローディングバー */
  bar: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const text: HTMLElement =
    root.querySelector(`[data-id="${ids.text}"]`) ??
    document.createElement("div");
  const bar: HTMLElement =
    root.querySelector(`[data-id="${ids.bar}"]`) ??
    document.createElement("div");
  return { text, bar };
}
