import {ROOT_CLASS} from "./class-name";
import {DataIDs} from "./data-ids";

/**
 * ルート要素のinnerHTML
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs) {
  return `
    <img class="${ROOT_CLASS}__end" data-id="${ids.end}">
    <img class="${ROOT_CLASS}__logo" data-id="${ids.logo}">
  `;
}