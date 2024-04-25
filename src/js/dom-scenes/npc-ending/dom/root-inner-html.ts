import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @returns innerHTML
 */
export function rootInnerHTML(ids: DataIDs) {
  return template({
    ids,
    ROOT_CLASS,
  });
}
