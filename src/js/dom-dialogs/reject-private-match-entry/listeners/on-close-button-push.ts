import { pop } from "../../../dom/animation";
import { RejectPrivateMatchEntryDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * 閉じるボタンを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloseButtonPush(
  props: RejectPrivateMatchEntryDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    props.pushButton.sound.play();
    await pop(props.closeButton, 1.05);
    props.dialogClosed.next();
  });
}
