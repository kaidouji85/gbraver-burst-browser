import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルート要素のinnerHTML
 * @param level ステージレベル
 * @param title ステージタイトル
 * @return innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  level: number,
  title: string,
): string {
  return `
    <div class="${ROOT_CLASS}__prefix">${level}</div>
    <div class="${ROOT_CLASS}__title">${title}</div>
    <div class="${ROOT_CLASS}__overlay" data-id="${ids.overlay}"></div>
  `;
}
