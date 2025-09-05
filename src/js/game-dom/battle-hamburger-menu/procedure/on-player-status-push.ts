import { PushDOM } from "../../../dom/push-dom";
import { BattleHamburgerMenuProps } from "../props";

/**
 * プレイヤーステータス押下時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onPlayerStatusPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();

  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    props.playerStatusOpeningNotifier.next();
  });
}
