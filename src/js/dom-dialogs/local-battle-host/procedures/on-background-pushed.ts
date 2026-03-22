import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleHostDialogProps } from "../props";

/**
 * バックグラウンドを押した時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onBackgroundPushed = (
  props: LocalBattleHostDialogProps,
  action: PushDOM,
) => {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.closeButtonSound);
    props.dialogClosed.next();
  });
};
