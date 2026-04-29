import template from "./root-inner-html.hbs";

/** ルート要素innerHTML生成オプション */
export type RootInnerHTMLOptions = {
  /** 戦闘モード */
  battleMode?: string;
};

/**
 * ルート要素のinnerHTML
 * @param options オプション
 * @returns innerHTML
 */
export function rootInnerHTML(options: RootInnerHTMLOptions): string {
  const battleModeClass = options.battleMode
    ? "player-select__battle-mode"
    : "player-select__battle-mode--invisible";
  const battleModeValue = options?.battleMode ?? "";
  return template({ battleModeClass, battleModeValue });
}
