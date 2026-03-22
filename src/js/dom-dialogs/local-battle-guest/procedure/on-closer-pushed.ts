import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleGuestDialogProps } from "../props";

/**
 * クロージャーを押したときの処理
 * @param props プロパティ
 * @param action アクション
 */
export const onCloserPushed = (
  props: LocalBattleGuestDialogProps,
  action: PushDOM,
): void => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    await pop(props.closer, 1.3);
  });
};
