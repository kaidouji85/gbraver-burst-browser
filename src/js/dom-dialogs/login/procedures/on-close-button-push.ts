import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LoginDialogProps } from "../props";

/**
 * 閉じるボタンを押した時の処理
 * @param props ログインダイアログのプロパティ
 * @param action アクション
 */
export function onCloseButtonPush(
  props: LoginDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    props.changeValue.sound.play();
    await pop(props.closeButton);
    props.closeDialog.next();
  });
}
