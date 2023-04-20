import { ROOT } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param ids data-idをあつめたもの
 * @return 生成結果
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT}__batteries" data-id="${ids.batteries}">
      <div class="${ROOT}__battery">0</div>
      <div class="${ROOT}__battery">1</div>
      <div class="${ROOT}__battery">2</div>
      <div class="${ROOT}__battery">3</div>
      <div class="${ROOT}__battery">4</div>
      <div class="${ROOT}__battery">5</div>
    </div>
    <button type="button" class="${ROOT}__burst" data-id="${ids.burst}" accesskey="b">バースト(b)</button>
    <button type="button" class="${ROOT}__pilot" data-id="${ids.pilot}" accesskey="p">パイロット(p)</button>
  `;
}
