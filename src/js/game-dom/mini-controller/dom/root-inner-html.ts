import { ROOT } from "./class-name";
import { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param ids data-idをあつめたもの
 * @return 生成結果
 */
export function rootInnerHTML(ids: DataIDs): string {
  console.log(template);  // TODO 開発が終わったら削除する
  return `
    <div class="${ROOT}__batteries" data-id="${ids.batteries}"></div>
  `;
}
