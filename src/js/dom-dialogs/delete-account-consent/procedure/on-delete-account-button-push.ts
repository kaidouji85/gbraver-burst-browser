import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { DeleteAccountConsentDialogProps } from "../props";

/**
 * アカウント削除ボタンを押した際の処理
 * @param props ダイアログのプロパティ
 * @param action アクション
 */
export function onDeleteAccountButtonPush(
  props: DeleteAccountConsentDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    action.event.stopPropagation();
    props.pushButton.sound.play();
    await pop(props.deleteAccountButton);
    props.deleteAccount.next();
  });
}
