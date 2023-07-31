import { ROOT_CLASS } from "./class-name";
import { DataIDs } from "./data-ids";
import template from "./root-inner-html.hbs";

/** 生成パラメータ */
type Params = {
  /** data-idをまとめたもの */
  ids: DataIDs;
  /** ステージレベル */
  level: number;
  /** ステージキャプション */
  caption: string[];
};

/**
 * ルート要素のinnerHTML
 * @return ルート要素のinnerHTML
 */
export function rootInnerHTML(params: Params): string {
  return template({
    ...params,
    ROOT_CLASS,
  });
}
