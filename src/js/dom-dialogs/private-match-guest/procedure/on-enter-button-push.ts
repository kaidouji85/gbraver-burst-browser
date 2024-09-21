import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * プライベートマッチ開始ボタンが押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onEnterButtonPush(
  props: PrivateMatchGuestDialogProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.pushButton);
    await pop(props.enterButton);
    props.privateMatchStart.next(props.roomID.value);
  });
}
