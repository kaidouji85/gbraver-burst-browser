import { pop } from "../../../dom/animation";
import { PushDOM } from "../../../dom/push-dom";
import { NetBattleSelectorDialogProps } from "../props";

/**
 * クロージャが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onCloserPush(
  props: NetBattleSelectorDialogProps,
  action: PushDOM
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.valueChange.sound.play();
    await pop(props.closer, 1.3);
    props.dialogClosed.next();
  });
}
