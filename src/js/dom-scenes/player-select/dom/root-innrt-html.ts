import { DataIDs } from "./data-ids";

/**
 * ルート要素のinnerHTML
 *
 * @param ids data-idを集めたもの
 * @return innerHTML
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="player-select__working" data-id="${ids.working}"></div>
    <div class="player-select__selector" data-id="${ids.selector}"></div>
  `;
}
