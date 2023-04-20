import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** バッテリーコマンドを集めたもの */
  batteries: HTMLElement;
  /** バーストコマンド */
  burst: HTMLElement;
  /** パイロットコマンド */
  pilot: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const batteries: HTMLElement =
    root.querySelector(`[data-id="${ids.batteries}"]`) ??
    document.createElement("div");
  const burst: HTMLElement =
    root.querySelector(`[data-id="${ids.burst}"]`) ??
    document.createElement("div");
  const pilot: HTMLElement =
    root.querySelector(`[data-id="${ids.pilot}"]`) ??
    document.createElement("div");
  return { batteries, burst, pilot };
}
