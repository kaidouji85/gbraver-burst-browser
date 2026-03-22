import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleHostDialogProps } from "../props";

/**
 * クロージャーを押した時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onCloserPushed = (
  props: LocalBattleHostDialogProps,
  action: PushDOM,
) => {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    await pop(props.closer, 1.3);
  });
};
