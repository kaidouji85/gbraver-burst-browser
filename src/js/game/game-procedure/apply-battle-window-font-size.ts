import {
  BATTLE_WINDOW_FONT_LARGE,
  BATTLE_WINDOW_FONT_NORMAL,
  BATTLE_WINDOW_FONT_SMALL,
  setBattleWindowFontSize,
} from "../../css/battle-window-font-size";
import { BattleWindowFontSize } from "../config/browser-config";

/** 戦闘ウィンドウのフォントサイズと対応するカスタムcss */
const BattleWindowFontSizeMap = {
  small: BATTLE_WINDOW_FONT_SMALL,
  normal: BATTLE_WINDOW_FONT_NORMAL,
  large: BATTLE_WINDOW_FONT_LARGE,
} as const;

/**
 * 戦闘ウィンドウのフォントサイズを適用する
 * @param battleWindowFontSize 戦闘ウィンドウのフォントサイズ値
 */
export function applyBattleWindowFontSize(
  battleWindowFontSize: BattleWindowFontSize,
) {
  const value = BattleWindowFontSizeMap[battleWindowFontSize];
  setBattleWindowFontSize(value);
}
