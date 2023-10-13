import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { Episode } from "../../episode";
import { CHECKER_CLASS_INVISIBLE, ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param resources リソース管理オブジェクト
 * @param ids data-idをあつめたもの
 * @param episode エピソード情報
 * @return innerHTML
 */
export function rootInnerHTML(resources: Resources, ids: DataIDs, episode: Episode): string {
  const checkPath = resources.paths.find(v => v.id === PathIds.CHECK)?.path ?? "";
  return rootInnerHTMLTemplate({
    ...episode,
    ids,
    ROOT_CLASS,
    CHECKER_CLASS_INVISIBLE,
    checkPath,
  });
}
