import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { RejectPrivateMatchEntryDialogProps } from "../props";

/**
 * 閉じるボタンを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloseButtonPush(
  props: RejectPrivateMatchEntryDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    props.se.play(props.pushButton);
    await pop(props.closeButton, 1.05);
    props.dialogClosed.next();
  });
}
