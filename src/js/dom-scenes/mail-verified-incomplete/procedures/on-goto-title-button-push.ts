import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { MailVerifiedIncompleteProps } from "../props";

/**
 * タイトルへボタンが押された時の処理
 * @param action アクション
 */
export function onGotoTitleButtonPush(
  props: Readonly<MailVerifiedIncompleteProps>,
  action: Readonly<PushDOM>,
): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    action.event.stopPropagation();
    await pop(props.gotoTitleButton);
    props.gotoTitle.next();
  });
}
