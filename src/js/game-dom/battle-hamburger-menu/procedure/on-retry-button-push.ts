import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import {
  BACKGROUND_HIDDEN,
  RETRY_CONFIRM_DIALOG_HIDDEN,
} from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * リトライボタン押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onRetryButtonPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.decideSound);
    await pop(props.retryButton);
    props.retryNotifier.next();
    props.background.className = BACKGROUND_HIDDEN;
    props.retryConfirmDialog.className = RETRY_CONFIRM_DIALOG_HIDDEN;
  });
}
