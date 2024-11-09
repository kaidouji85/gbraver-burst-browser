import { MENU_HIDDEN } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * メニューを非表示にする
 * @param props プロパティ
 */
export function hiddenMenu(props: BattleHamburgerMenuProps): void {
  props.menu.className = MENU_HIDDEN;
}
