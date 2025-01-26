import { PushDOM } from "../../../dom/push-dom";
import { BattleHamburgerMenuProps } from "../props";

/**
 * ルート押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onRootPush(props: BattleHamburgerMenuProps, action: PushDOM) {
  action.event.preventDefault();
  action.event.stopPropagation();
}
