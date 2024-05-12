import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTMLを生成する
 * @returns 生成結果
 */
export function rootInnerHTML() {
  return template({
    ROOT,
  });
}
