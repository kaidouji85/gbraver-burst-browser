/** カスタムcssプロパティ --battle-window-font-large */
export const BATTLE_WINDOW_FONT_SMALL = "--battle-window-font-small";

/** カスタムcssプロパティ --battle-window-font-normal */
export const BATTLE_WINDOW_FONT_NORMAL = "--battle-window-font-normal";

/** カスタムcssプロパティ --battle-window-font-large */
export const BATTLE_WINDOW_FONT_LARGE = "--battle-window-font-large";

/** カスタムcssプロパティ --battle-window-font-size */
export const BATTLE_WINDOW_FONT_SIZE = "--battle-window-font-size";

/** 戦闘ウィンドウのフォントサイズ値 */
type BattleWindowFontSizeValue =
  | typeof BATTLE_WINDOW_FONT_SMALL
  | typeof BATTLE_WINDOW_FONT_NORMAL
  | typeof BATTLE_WINDOW_FONT_LARGE;

/**
 * --battle-window-font-sizeに値をセットする
 * @param value 設定値
 */
export const setBattleWindowFontSize = (value: BattleWindowFontSizeValue) => {
  if (document.documentElement) {
    document.documentElement.style.setProperty(
      BATTLE_WINDOW_FONT_SIZE,
      `var(${value})`,
    );
  }
};
