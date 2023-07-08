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
  props.exclusive.execute(async () => {
    action.event.stopPropagation();
    action.event.preventDefault();
    props.changeValue.sound.play();
    await pop(props.closer, 1.3);
    props.dialogClosed.next();
  });
}
