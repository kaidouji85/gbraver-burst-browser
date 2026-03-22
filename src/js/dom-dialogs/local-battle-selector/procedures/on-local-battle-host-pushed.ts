import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import { LocalBattleSelectorDialogProps } from "../props";

/**
 * ローカル対戦ホストボタンが押された時の処理
 * @param props プロパティ
 * @param action アクション
 */
export const onLocalBattleHostPushed = (
  props: LocalBattleSelectorDialogProps,
  action: PushDOM,
): void => {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    await pop(props.localBattleHostButton, 1.02);
  });
};
