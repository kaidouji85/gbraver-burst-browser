import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @param mailAddress メールアドレス
 * @returns ルート要素innerHTML
 */
export function rootInnerHTML(ids: DataIDs, mailAddress: string): string {
  return rootInnerHTMLTemplate({
    ROOT_CLASS,
    ids,
    mailAddress,
  });
}
