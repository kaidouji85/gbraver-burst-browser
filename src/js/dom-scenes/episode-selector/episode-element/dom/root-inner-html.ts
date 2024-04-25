import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { Episode } from "../../episode";
import { BLOCK, CHECKER_INVISIBLE } from "./class-name";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param resources リソース管理オブジェクト
 * @param episode エピソード情報
 * @returns innerHTML
 */
export function rootInnerHTML(resources: Resources, episode: Episode): string {
  const checkPath =
    resources.paths.find((v) => v.id === PathIds.CHECK)?.path ?? "";
  return rootInnerHTMLTemplate({
    ...episode,
    BLOCK,
    CHECKER_INVISIBLE,
    checkPath,
  });
}
