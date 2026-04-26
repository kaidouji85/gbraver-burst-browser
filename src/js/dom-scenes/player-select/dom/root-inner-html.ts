import { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @returns innerHTML
 */
export function rootInnerHTML(ids: DataIDs): string {
  return template({ ids });
}
