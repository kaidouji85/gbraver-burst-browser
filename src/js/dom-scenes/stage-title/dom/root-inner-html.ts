import {ROOT_CLASS} from "./class-name";
import {DataIDs} from "./data-ids";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param ids data-idをまとめたもの
 * @param level ステージレベル
 * @return ルート要素のinnerHTML
 */
export function rootInnerHTML(ids: DataIDs, level: number): string {
  return template({
    ROOT_CLASS,
    ids,
    level
  });
}