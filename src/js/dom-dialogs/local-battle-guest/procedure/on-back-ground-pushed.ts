import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleGuestDialogProps } from "../props";

/**
 * バックグラウンドを押したときの処理
 * @param props プロパティ
 * @param action アクション
 */
export const onBackGroundPushed = (
  props: LocalBattleGuestDialogProps,
  action: PushDOM,
) => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.dialogClosedSound);
    props.dialogClosedSubject.next();
  });
};
