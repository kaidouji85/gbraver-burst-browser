import * as R from "ramda";
import { ROOT } from "./class-name";
import { DataIDs } from "./data-ids";

/** バッテリーボタン最大個数 */
const MAX_BATTERY_BUTTON = 6;

/**
 * バッテリーボタンHTMLを生成する
 * @param battery バッテリー値
 * @return 生成結果
 */
const batteryButton = (battery: number) => `
  <button class="${ROOT}__battery" accesskey="${battery}" data-battery="${battery}">${battery}</button>
`;

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
    <button type="button" class="${ROOT}__burst" data-id="${ids.burst}" accesskey="b">バースト(b)</button>
    <button type="button" class="${ROOT}__pilot" data-id="${ids.pilot}" accesskey="p">パイロット(p)</button>
  `;
}
