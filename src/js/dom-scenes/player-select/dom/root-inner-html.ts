import template from "./root-inner-html.hbs";

/** ルート要素innerHTML生成オプション */
export type RootInnerHTMLOptions = {
  /** 戦闘モード */
  battleMode?: string;
};

/**
 * ルート要素のinnerHTML
 * @param battleMode 戦闘モード
 * @returns innerHTML
 */
export function rootInnerHTML(options: RootInnerHTMLOptions): string {
  const battleMode = options?.battleMode ?? "";
  return template({ battleMode });
}
