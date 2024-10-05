import { BattleWindowFontSize } from "../../../game/config/browser-config";
import template from "./battle-window-font-size-item.hbs";
import { ROOT_CLASS } from "./class-name";

/** 戦闘ウインドウ フォントサイズ 値に対応するラベル */
const battleWindowFontSizeLabel = {
  small: "小さい",
  normal: "普通",
  large: "大きい",
};

/** パラメータ */
type Params = {
  /** 戦闘ウインドウ フォントサイズ 値 */
  value: BattleWindowFontSize;
  /** 選択されているか否か、選択されている場合はtrue */
  isChecked: boolean;
};

/**
 * 戦闘画面フォントサイズのラジオボタン要素HTMLを生成する
 * @param params パラメータ
 * @returns 生成結果
 */
export function battleWindowFontSizeItem(params: Params) {
  return template({
    ...params,
    ROOT_CLASS,
    checked: params.isChecked ? "checked" : "",
    caption: battleWindowFontSizeLabel[params.value],
  });
}
