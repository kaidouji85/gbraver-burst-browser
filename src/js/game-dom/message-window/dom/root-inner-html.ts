import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTML
 * @param ids data-idを集めたもの
 * @returns innerHTML
 */
export function rootInnerHTML(ids: DataIDs): string {
  return rootInnerHTMLTemplate({
    ROOT_CLASS,
    ids,
  });
}
