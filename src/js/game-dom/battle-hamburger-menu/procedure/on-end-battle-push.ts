import { PushDOM } from "../../../dom/push-dom";
import {
  BACKGROUND,
  END_BATTLE_CONFIRM_DIALOG,
  MENU_HIDDEN,
} from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * バトル終了押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onEndBattlePush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
): void {
  action.event.stopPropagation();
  action.event.preventDefault();

  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    props.background.className = BACKGROUND;
    props.endBattleConfirmDialog.className = END_BATTLE_CONFIRM_DIALOG;
    props.menu.className = MENU_HIDDEN;
  });
}
