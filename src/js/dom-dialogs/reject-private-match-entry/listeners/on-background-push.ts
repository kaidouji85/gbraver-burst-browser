import { PushDOM } from "../../../dom/event-stream";
import { RejectPrivateMatchEntryDialogProps } from "../props";

/**
 * 背景を押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackgroundPush(
  props: RejectPrivateMatchEntryDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    props.changeValue.sound.play();
    props.dialogClosed.next();
  });
}
