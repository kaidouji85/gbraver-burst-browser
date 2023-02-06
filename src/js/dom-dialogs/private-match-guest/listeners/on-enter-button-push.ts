import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * プライベートマッチ開始ボタンが押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onEnterButtonPush(
  props: PrivateMatchGuestDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    action.event.stopPropagation();
    await pop(props.enterButton);
    props.privateMatchStart.next(props.roomID.value);
  });
}
