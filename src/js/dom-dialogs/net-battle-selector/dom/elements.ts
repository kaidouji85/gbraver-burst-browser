import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** 背景 */
  backGround: HTMLElement;
  /** クロージャ */
  closer: HTMLElement;
  /** カジュアルマッチボタン */
  casualMatchButton: HTMLElement;
  /** プライベートマッチ（ホスト）ボタン */
  privateMatchHostButton: HTMLElement;
  /** プライベートマッチ（ゲスト）ボタン */
  privateMatchGuestButton: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
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
  const casualMatchButton: HTMLElement =
    root.querySelector(`[data-id="${ids.casualMatchButton}"]`) ??
    document.createElement("div");
  const privateMatchHostButton: HTMLElement =
    root.querySelector(`[data-id="${ids.privateMatchHostButton}"]`) ??
    document.createElement("div");
  const privateMatchGuestButton: HTMLElement =
    root.querySelector(`[data-id="${ids.privateMatchGuestButton}"]`) ??
    document.createElement("div");
  return {
    backGround,
    closer,
    casualMatchButton,
    privateMatchHostButton,
    privateMatchGuestButton,
  };
}
