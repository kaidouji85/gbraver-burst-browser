import { PushDOM } from "../../../dom/push-dom";
import { PasswordMatchSelectorDialogProps } from "../props";

/**
 * バックグラウンドが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onBackGroundPushed = (
  props: PasswordMatchSelectorDialogProps,
  action: PushDOM,
): void => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.closeButtonSound);
    props.dialogClosed.next();
  });
};
