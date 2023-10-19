import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { BLOCK, EPISODE_TYPE, EPISODE_TYPE_SELECTED } from "./class-name";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルート要素のinnerHTML
 * @param resources リソース管理オブジェクト
 * @return innerHTML
 */
export function rootInnerHTML(resources: Resources): string {
  const imageCut01 =
    resources.paths.find((v) => v.id === PathIds.IMAGE_CUT_BATTERY_SYSTEM)
      ?.path ?? "";
  const imageCut02 =
    resources.paths.find((v) => v.id === PathIds.IMAGE_CUT_ZERO_DEFENSE)
      ?.path ?? "";
  const imageCut03 =
    resources.paths.find((v) => v.id === PathIds.IMAGE_CUT_BURST)?.path ?? "";
  return rootInnerHTMLTemplate({
    BLOCK,
    EPISODE_TYPE,
    EPISODE_TYPE_SELECTED,
    imageCut01,
    imageCut02,
    imageCut03,
  });
}
