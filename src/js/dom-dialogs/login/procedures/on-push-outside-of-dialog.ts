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
    props.changeValue.sound.play();
    props.closeDialog.next();
  });
}
