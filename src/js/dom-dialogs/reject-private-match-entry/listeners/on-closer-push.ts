import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/event-stream";
import { RejectPrivateMatchEntryDialogProps } from "../props";

/**
 * クロージャを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(props: RejectPrivateMatchEntryDialogProps, action: PushDOM): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    await pop(props.closer, 1.3);
    props.dialogClosed.next();
  });
}
