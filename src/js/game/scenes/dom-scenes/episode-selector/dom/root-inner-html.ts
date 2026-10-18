import { BLOCK, EPISODE_TYPE, EPISODE_TYPE_SELECTED } from "./class-name";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @returns innerHTML
 */
export function rootInnerHTML(): string {
  return rootInnerHTMLTemplate({
    BLOCK,
    EPISODE_TYPE,
    EPISODE_TYPE_SELECTED,
  });
}
