import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { MENU, MENU_HIDDEN } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * メニューを開く
 * @param props プロパティ
 */
function openMenu(props: BattleHamburgerMenuProps) {
  props.se.play(props.changeValueSound);
  pop(props.hamburgerIcon, 1.2);
  props.menu.className = MENU;
}

/**
 * メニューを閉じる
 * @param props プロパティ
 */
function closeMenu(props: BattleHamburgerMenuProps) {
  props.menu.className = MENU_HIDDEN;
}

/**
 * ハンバーガーアイコンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onHamburgerIconPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
) {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    const isMenuOpen = props.menu.className === MENU;
    if (isMenuOpen) {
      closeMenu(props);
    } else {
      openMenu(props);
    }
  });
}
