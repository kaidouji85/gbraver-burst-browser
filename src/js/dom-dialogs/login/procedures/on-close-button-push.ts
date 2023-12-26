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
    await Promise.all([pop(props.closeButton), props.changeValue.play()]);
    props.closeDialog.next();
  });
}
