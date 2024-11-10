import { PushDOM } from "../../../dom/push-dom";
import {
  BACKGROUND,
  MENU_HIDDEN,
  RETRY_CONFIRM_DIALOG,
} from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * リトライ押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onRetryPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
): void {
  action.event.stopPropagation();
  action.event.preventDefault();
  if (!props.canRetry) {
    return;
  }

  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    props.background.className = BACKGROUND;
    props.retryConfirmDialog.className = RETRY_CONFIRM_DIALOG;
    props.menu.className = MENU_HIDDEN;
  });
}
