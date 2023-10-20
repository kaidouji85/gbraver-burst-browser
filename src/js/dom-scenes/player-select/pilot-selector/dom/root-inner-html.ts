import { BLOCK } from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @return 生成結果
 */
export function rootInnerHTML() {
  return template({
    BLOCK
  });
}