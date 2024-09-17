import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { PrivateMatchGuestDialogProps } from "../props";

/**
 * クロージャが押された時の処理
 * @param props ダイアログプロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: PrivateMatchGuestDialogProps,
  action: PushDOM,
): void {
  action.event.stopPropagation();
  action.event.preventDefault();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValue);
    await pop(props.closer, 1.3);
    props.dialogClosed.next();
  });
}
