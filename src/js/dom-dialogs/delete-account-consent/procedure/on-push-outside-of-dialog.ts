import { PushDOM } from "../../../dom/push-dom";
import { DeleteAccountConsentDialogProps } from "../props";

/**
 * ダイアログ外を押した際の処理
 * @param props ダイアログのプロパティ
 * @param action アクション
 */
export function onPushOutsideOfDialog(
  props: DeleteAccountConsentDialogProps,
  action: PushDOM,
): void {
  props.exclusive.execute(async (): Promise<void> => {
    action.event.stopPropagation();
    props.se.play(props.changeValue);
    props.closeDialog.next();
  });
}
