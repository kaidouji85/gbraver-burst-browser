import { PushDOM } from "../../../dom/push-dom";
import { LoginDialogProps } from "../props";

/**
 * ダイアログ外を押した時の処理
 * @param props ログインダイアログのプロパティ
 * @param action アクション
 */
export function onPushOutsideOfDialog(
  props: LoginDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    await props.changeValue.play();
    props.closeDialog.next();
  });
}
