import { Resources } from "../../../../resource";
import { PathIds } from "../../../../resource/path/ids";
import { Episode } from "../episode";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param ids data-idをあつめたもの
 * @param resources リソース管理オブジェクト
 * @param episode エピソード情報
 * @return innerHTML
 */
export function rootInnerHTML(
  ids: DataIDs,
  resources: Resources,
  episode: Episode,
): string {
  const check = resources.paths.find((v) => v.id === PathIds.CHECK)?.path ?? "";
  return rootInnerHTMLTemplate({
    ...episode,
    ids,
    ROOT_CLASS,
    check,
  });
}
