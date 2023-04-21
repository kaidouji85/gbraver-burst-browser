import * as R from "ramda";

import { ROOT } from "./class-name";
import { DataIDs } from "./data-ids";
import { batteryButton } from "./battery-button";
import { burstButton } from "./burst-button";

/** バッテリーボタン最大個数 */
const MAX_BATTERY_BUTTON = 9;

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param ids data-idをあつめたもの
 * @return 生成結果
 */
export function rootInnerHTML(ids: DataIDs): string {
  const batteryButtons: string = R.times(R.identity, MAX_BATTERY_BUTTON)
    .map(batteryButton)
    .join("");
  return `
    <div class="${ROOT}__batteries" data-id="${ids.batteries}">
      ${batteryButtons}
    </div>
    ${burstButton(ids.burst)}
    <button type="button" class="${ROOT}__pilot" data-id="${ids.pilot}" accesskey="p">パイロット(p)</button>
  `;
}
