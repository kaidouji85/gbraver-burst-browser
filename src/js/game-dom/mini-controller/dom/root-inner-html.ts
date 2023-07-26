import * as Handlebars from "handlebars";

import { ROOT } from "./class-name";
import { DataIDs } from "./data-ids";
import hbs from "./root-inner-html.hbs";

const template = Handlebars.compile(hbs);

/**
 * ルートHTML要素のinnerHTMLを生成する
 * @param ids data-idをあつめたもの
 * @return 生成結果
 */
export function rootInnerHTML(ids: DataIDs): string {
  return template({ ids, ROOT });
}
