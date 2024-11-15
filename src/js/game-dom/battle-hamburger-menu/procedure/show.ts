import { BACKGROUND_HIDDEN, MENU_HIDDEN, ROOT } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * ハンバーガーメニューを表示する
 * @param props プロパティ
 */
export function show(props: BattleHamburgerMenuProps): void {
  props.root.className = ROOT;
  props.menu.className = MENU_HIDDEN;
  props.background.className = BACKGROUND_HIDDEN;
}
