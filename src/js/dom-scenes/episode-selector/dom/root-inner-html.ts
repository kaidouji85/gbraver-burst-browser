import { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";

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
  return `
    <div class="${ROOT_CLASS}__title">チュートリアル</div>
    <div class="${ROOT_CLASS}__image-cuts" data-id="${ids.imageCuts}">
      <img class="${ROOT_CLASS}__cut-01" src="${imageCut01}">
      <img class="${ROOT_CLASS}__cut-02" src="${imageCut02}">
      <img class="${ROOT_CLASS}__cut-03" src="${imageCut03}">
    </div>
    <div class="${ROOT_CLASS}__stages" data-id="${ids.stages}"></div>
    <button class="${ROOT_CLASS}__prev" data-id="${ids.prevButton}">戻る</button>
  `;
}
