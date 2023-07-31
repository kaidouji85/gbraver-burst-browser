import {ROOT_CLASS} from "./class-name";
import {DataIDs} from "./data-ids";

/**
 * ルート要素のinnerHTML
 * @param ids data-idをまとめたもの
 * @param level ステージレベル
 * @return ルート要素のinnerHTML
 */
export function rootInnerHTML(ids: DataIDs, level: number): string {
  return `
    <div class="${ROOT_CLASS}__title">
      <div class="${ROOT_CLASS}__stage">
        <div class="${ROOT_CLASS}__stage-prefix">STAGE</div>
        <div class="${ROOT_CLASS}__stage-level">${level}</div>
      </div>
      <div class="${ROOT_CLASS}__caption" data-id="${ids.caption}"></div>
    </div>
    <img class="${ROOT_CLASS}__armdozer-icon" data-id="${ids.armDozerIcon}">
  `;
}