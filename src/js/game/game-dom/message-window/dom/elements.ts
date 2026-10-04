import { DataIDs } from "./data-ids";

/** ルート要素の子孫要素 */
type Elements = {
  messages: HTMLElement;
  leftFaceGraphic: HTMLElement;
  rightFaceGraphic: HTMLElement;
};

/**
 * ルート要素から子孫要素を抽出する
 * @param root ルート要素
 * @param ids data-idを集めたもの
 * @returns 抽出結果
 */
export function extractElements(root: HTMLElement, ids: DataIDs): Elements {
  const messages: HTMLElement =
    root.querySelector(`[data-id="${ids.messages}"]`) ??
    document.createElement("div");
  const leftFaceGraphic: HTMLElement =
    root.querySelector(`[data-id="${ids.leftFaceGraphic}"]`) ??
    document.createElement("div");
  const rightFaceGraphic: HTMLElement =
    root.querySelector(`[data-id="${ids.rightFaceGraphic}"]`) ??
    document.createElement("div");
  return {
    messages,
    leftFaceGraphic,
    rightFaceGraphic,
  };
}
