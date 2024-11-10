import { MENU_HIDDEN } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * メニュー外を押した時の処理
 * @param props プロパティ
 */
export function onMenuOutsidePush(props: BattleHamburgerMenuProps): void {
  props.exclusive.execute(async () => {
    props.menu.className = MENU_HIDDEN;
  });
}
