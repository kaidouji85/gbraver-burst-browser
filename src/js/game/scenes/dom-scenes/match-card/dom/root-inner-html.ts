import { DataIDs } from "./data-ids";
import rootInnerHTMLTemplate from "./root-inner-html.hbs";

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param ids data-idをあつめたもの
 * @param caption キャプション
 * @returns 生成結果
 */
export function rootInnerHTML(ids: DataIDs, caption: string): string {
  return rootInnerHTMLTemplate({
    ids,
    caption,
  });
}
