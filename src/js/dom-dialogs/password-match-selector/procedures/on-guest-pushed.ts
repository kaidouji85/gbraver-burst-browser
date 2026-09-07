import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { PasswordMatchSelectorDialogProps } from "../props";

/**
 * あいことば対戦ゲストボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onGuestPushed = (
  props: PasswordMatchSelectorDialogProps,
  action: PushDOM,
): void => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.pushButtonSound);
    await pop(props.guestButton, 1.02);
    props.guestSelection.next();
  });
};
