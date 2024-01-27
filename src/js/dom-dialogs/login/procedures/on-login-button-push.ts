import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LoginDialogProps } from "../props";

/**
 * ログインボタン押下時の処理
 * @param props ログインダイアログのプロパティ
 * @param action アクション
 */
export function onLoginButtonPush(
  props: LoginDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    await Promise.all([pop(props.loginButton), props.pushButton.play()]);
    props.login.next();
  });
}
