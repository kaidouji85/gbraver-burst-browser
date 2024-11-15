import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import {
  BACKGROUND_HIDDEN,
  RETRY_CONFIRM_DIALOG_HIDDEN,
} from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * リトライキャンセルボタン押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onRetryCancelButtonPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
) {
  action.event.stopPropagation();
  action.event.preventDefault();

  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    await pop(props.retryCancelButton);
    props.background.className = BACKGROUND_HIDDEN;
    props.retryConfirmDialog.className = RETRY_CONFIRM_DIALOG_HIDDEN;
  });
}
