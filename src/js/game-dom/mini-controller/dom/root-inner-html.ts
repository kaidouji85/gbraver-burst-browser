import { ROOT } from "./class-name";
import { DataIDs } from "./data-ids";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param ids data-idをあつめたもの
 * @return 生成結果
 */
export function rootInnerHTML(ids: DataIDs): string {
  return `
    <div class="${ROOT}__batteries" data-id="${ids.batteries}"></div>
  `;
}
