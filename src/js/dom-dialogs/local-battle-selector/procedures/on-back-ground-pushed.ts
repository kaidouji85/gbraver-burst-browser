import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleSelectorDialogProps } from "../props";

/**
 * バックグランドが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onBackGroundPushed = (
  props: LocalBattleSelectorDialogProps,
  action: PushDOM,
): void => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.closeButtonSound);
    props.dialogClosed.next();
  });
};
