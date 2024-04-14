import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { DeleteAccountConsentDialogProps } from "../props";

/**
 * クローザを押した際の処理
 * @param props ダイアログのプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: DeleteAccountConsentDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.preventDefault();
    action.event.stopPropagation();
    props.se.play(props.changeValue);
    await pop(props.closer, 1.3);
    props.closeDialog.next();
  });
}
