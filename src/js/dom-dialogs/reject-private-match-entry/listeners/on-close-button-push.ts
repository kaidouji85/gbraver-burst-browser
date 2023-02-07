import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { RejectPrivateMatchEntryDialogProps } from "../props";

/**
 * 閉じるボタンを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloseButtonPush(
  props: RejectPrivateMatchEntryDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    await pop(props.closeButton);
  });
}
