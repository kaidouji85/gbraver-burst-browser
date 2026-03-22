import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleGuestDialogProps } from "../props";

/**
 * バトルスタートが押されたときの処理
 * @param props プロパティ
 * @param action アクション
 */
export const onBattleStartPushed = (
  props: LocalBattleGuestDialogProps,
  action: PushDOM,
) => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.battleStartSound);
    await pop(props.battleStartButton);
  });
};
