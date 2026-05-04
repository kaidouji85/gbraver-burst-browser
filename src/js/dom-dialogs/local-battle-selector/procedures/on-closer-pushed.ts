import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleSelectorDialogProps } from "../props";

/**
 * クロージャーが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onCloserPushed = (
  props: LocalBattleSelectorDialogProps,
  action: PushDOM,
) => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.closeButtonSound);
    await pop(props.closer, 1.3);
    props.dialogClosed.next();
  });
};
