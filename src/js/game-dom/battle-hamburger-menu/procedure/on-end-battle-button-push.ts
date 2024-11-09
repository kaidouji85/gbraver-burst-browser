import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import {
  BACKGROUND_HIDDEN,
  END_BATTLE_CONFIRM_DIALOG_HIDDEN,
} from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * バトル終了ボタン押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onEndBattleButtonPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.decideSound);
    await pop(props.endBattleButton);
    props.endBattleNotifier.next();
    props.background.className = BACKGROUND_HIDDEN;
    props.endBattleConfirmDialog.className = END_BATTLE_CONFIRM_DIALOG_HIDDEN;
  });
}
