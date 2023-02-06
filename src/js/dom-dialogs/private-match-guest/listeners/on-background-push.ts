import { PushDOM } from "../../../dom/event-stream";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * 背景が押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onBackgroundPush(
  props: PrivateMatchGuestDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    action.event.stopPropagation();
    props.changeValue.sound.play();
    props.dialogClosed.next();
  });
}
