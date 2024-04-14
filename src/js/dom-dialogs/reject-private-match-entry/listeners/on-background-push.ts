import { PushDOM } from "../../../dom/push-dom";
import { RejectPrivateMatchEntryDialogProps } from "../props";

/**
 * 背景を押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackgroundPush(
  props: RejectPrivateMatchEntryDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    props.se.play(props.changeValue);
    props.dialogClosed.next();
  });
}
