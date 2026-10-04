import { ROOT_CLASS } from "./class-name";

/**
 * 特定の文字列をハイライトするためのHTMLを生成
 * @param text ハイライトするテキスト
 * @return ハイライトされたテキストを含むHTML文字列
 */
export const highlight = (text: string) =>
  `<span class="${ROOT_CLASS}__highlight">${text}</span>`;
