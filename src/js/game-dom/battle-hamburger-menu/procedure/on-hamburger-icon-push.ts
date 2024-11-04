import { PushDOM } from "../../../dom/push-dom";
import { MENU } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

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
  props.menu.className = MENU;
}
