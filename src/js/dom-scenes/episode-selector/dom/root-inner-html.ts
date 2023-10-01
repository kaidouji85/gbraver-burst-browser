import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
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
    resources.paths.find((v) => v.id === PathIds.TUTORIAL_IMAGE_CUT_01)?.path ??
    "";
  const imageCut02 =
    resources.paths.find((v) => v.id === PathIds.TUTORIAL_IMAGE_CUT_02)?.path ??
    "";
  const imageCut03 =
    resources.paths.find((v) => v.id === PathIds.TUTORIAL_IMAGE_CUT_03)?.path ??
    "";
  return rootInnerHTMLTemplate({
    ids,
    ROOT_CLASS,
    imageCut01,
    imageCut02,
    imageCut03,
  });
}
