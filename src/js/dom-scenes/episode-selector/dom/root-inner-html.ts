import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { EPISODE_TYPE, EPISODE_TYPE_SELECTED, ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs, resources: Resources): string {
  const imageCut01 =
    resources.paths.find((v) => v.id === PathIds.IMAGE_CUT_BATTERY_SYSTEM)
      ?.path ?? "";
  const imageCut02 =
    resources.paths.find((v) => v.id === PathIds.IMAGE_CUT_ZERO_DEFENSE)
      ?.path ?? "";
  const imageCut03 =
    resources.paths.find((v) => v.id === PathIds.IMAGE_CUT_BURST)?.path ?? "";
  return rootInnerHTMLTemplate({
    ids,
    ROOT_CLASS,
    EPISODE_TYPE,
    EPISODE_TYPE_SELECTED,
    imageCut01,
    imageCut02,
    imageCut03,
  });
}
