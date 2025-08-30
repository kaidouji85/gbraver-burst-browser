import { PlayerState } from "gbraver-burst-core";

import { ROOT } from "./class-name";
import template from "./root-inner-html.hbs";

/** オプション */
export type RootInnerHTMLOptions = {
  /** ダイアログを表示するステート */
  state: PlayerState;
}

/**
 * ルート要素のinnerHTMLを生成する
 * @param options オプション
 * @returns 生成結果
 */
export function rootInnerHTML(options: RootInnerHTMLOptions): string {
  return template({ ROOT });
}
