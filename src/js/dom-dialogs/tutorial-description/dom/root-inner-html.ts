import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTMLを生成する
 * @returns ルート要素のinnerHTML
 */
export function rootInnerHTML(): string {
  return template({});
}