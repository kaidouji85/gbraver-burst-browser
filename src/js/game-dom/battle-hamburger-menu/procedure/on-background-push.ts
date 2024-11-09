import { PushDOM } from "../../../dom/push-dom";
import {
  BACKGROUND_HIDDEN,
  END_BATTLE_CONFIRM_DIALOG_HIDDEN,
  RETRY_CONFIRM_DIALOG_HIDDEN,
} from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * バックグラウンド押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onBackgroundPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
) {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    props.background.className = BACKGROUND_HIDDEN;
    props.retryConfirmDialog.className = RETRY_CONFIRM_DIALOG_HIDDEN;
    props.endBattleConfirmDialog.className = END_BATTLE_CONFIRM_DIALOG_HIDDEN;
  });
}
