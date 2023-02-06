import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** クロージャ */
  closer: HTMLElement;
  /** 背景 */
  background: HTMLElement;
  /** ルームID入力フォーム */
  roomID: HTMLElement;
  /** プライベートマット開始ボタン */
  enterButton: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 *
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @return 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const closer: HTMLElement =
    root.querySelector(`[data-id="${ids.closer}"]`) ??
    document.createElement("div");
  const background: HTMLElement =
    root.querySelector(`[data-id="${ids.background}"]`) ??
    document.createElement("div");
const roomID: HTMLElement =
    root.querySelector(`[data-id="${ids.roomID}"]`) ??
    document.createElement("div");
  const enterButton: HTMLElement =
    root.querySelector(`[data-id="${ids.enterButton}"]`) ??
    document.createElement("div");
  return { closer, background, roomID, enterButton };
}
