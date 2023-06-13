import { ROOT_CLASS } from "./class-name";

/**
 * ルート要素のinnerHTML
 * @param level ステージレベル
 * @param title ステージタイトル
 * @return innerHTML
 */
export function rootInnerHTML(level: number, title: string): string {
  return `
    <div class="${ROOT_CLASS}__prefix">${level}</div>
    <div class="${ROOT_CLASS}__title">${title}</div>
  `;
}
