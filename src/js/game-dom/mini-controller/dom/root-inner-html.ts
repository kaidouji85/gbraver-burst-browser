import { burstButton } from "./burst-button";
import { ROOT } from "./class-name";
import { DataIDs } from "./data-ids";
import { pilotButton } from "./pilot-button";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param ids data-idをあつめたもの
 * @return 生成結果
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT}__batteries" data-id="${ids.batteries}"></div>
    ${burstButton(ids.burst)}
    ${pilotButton(ids.pilot)}
  `;
}
