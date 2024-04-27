import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
export type Elements = {
  /** クロージャ */
  closer: HTMLElement;
  /** ルームID入力フォーム */
  roomID: HTMLInputElement;
  /** プライベートマット開始ボタン */
  enterButton: HTMLElement;
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
  const foundRoomID = root.querySelector(`[data-id="${ids.roomID}"]`);
  const roomID: HTMLInputElement =
    foundRoomID instanceof HTMLInputElement
      ? foundRoomID
      : document.createElement("input");
  const enterButton: HTMLElement =
    root.querySelector(`[data-id="${ids.enterButton}"]`) ??
    document.createElement("div");
  return { closer, roomID, enterButton };
}
