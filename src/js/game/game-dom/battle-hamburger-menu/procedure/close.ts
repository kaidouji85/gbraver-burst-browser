import { MENU_HIDDEN } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * メニューを閉じる
 * @param props プロパティ
 */
export function close(props: BattleHamburgerMenuProps) {
  props.exclusive.execute(async () => {
    props.menu.className = MENU_HIDDEN;
  });
}
