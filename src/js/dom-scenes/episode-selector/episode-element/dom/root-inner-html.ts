import { Episode } from "../episode";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param ids data-idをあつめたもの
 * @param episode エピソード情報
 * @return innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  episode: Episode,
): string {
  return rootInnerHTMLTemplate({
    ...episode,
    ids,
    ROOT_CLASS,
  });
}
