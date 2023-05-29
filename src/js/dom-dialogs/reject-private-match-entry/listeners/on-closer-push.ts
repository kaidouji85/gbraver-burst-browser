import { pop } from "../../../dom/animation";
import { RejectPrivateMatchEntryDialogProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * クロージャを押した時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: RejectPrivateMatchEntryDialogProps,
  action: PushDOM
): void {
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    props.changeValue.sound.play();
    await pop(props.closer, 1.3);
    props.dialogClosed.next();
  });
}
