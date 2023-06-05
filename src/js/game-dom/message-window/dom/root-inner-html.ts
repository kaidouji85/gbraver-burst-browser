import {DataIDs} from "./data-ids";
import {ROOT_CLASS} from "./class-name";

/**
 * ルートHTML要素のinnerHTML
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT_CLASS}__face-graphic" data-id="${ids.leftFaceGraphic}"></div>
    <div class="${ROOT_CLASS}__messages-wrapper">
      <div class="${ROOT_CLASS}__messages" data-id="${ids.messages}"></div>
    </div>
    <div class="${ROOT_CLASS}__face-graphic" data-id="${ids.rightFaceGraphic}"></div>
  `;
}