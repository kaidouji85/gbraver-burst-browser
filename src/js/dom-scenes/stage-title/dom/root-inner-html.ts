import { BLOCK } from "./class-name";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param level ステージレベル
 * @return ルート要素のinnerHTML
 */
export function rootInnerHTML(level: number): string {
  return template({
    BLOCK,
    level,
  });
}
