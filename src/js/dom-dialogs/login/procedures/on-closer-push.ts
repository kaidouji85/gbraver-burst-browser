import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LoginDialogProps } from "../props";

/**
 * クローザーを押した時の処理
 * @param props ログインダイアログのプロパティ
 * @param action アクション
 */
export function onCloserPush(props: LoginDialogProps, action: PushDOM): void {
  props.exclusive.execute(async () => {
    action.event.preventDefault();
    props.se.play(props.changeValue);
    await pop(props.closer, 1.3);
    props.closeDialog.next();
  });
}
