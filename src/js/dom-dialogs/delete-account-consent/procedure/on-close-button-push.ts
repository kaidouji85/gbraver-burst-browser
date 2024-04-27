import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { DeleteAccountConsentDialogProps } from "../props";

/**
 * 閉じるボタンを押した際の処理
 * @param props ダイアログのプロパティ
 * @param action アクション
 */
export function onCloseButtonPush(
  props: DeleteAccountConsentDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    action.event.stopPropagation();
    props.se.play(props.changeValue);
    await pop(props.closeButton);
    props.closeDialog.next();
  });
}
