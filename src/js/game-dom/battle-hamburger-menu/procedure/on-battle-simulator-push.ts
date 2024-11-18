import { PushDOM } from "../../../dom/push-dom";
import { MENU_HIDDEN } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * バトルシミュレーターを押した時の処理
 * @param props プロパティ
 * @param action アクション
 */
export function onBattleSimulatorPush(
  props: BattleHamburgerMenuProps,
  action: PushDOM,
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.exclusive.execute(async () => {
    props.se.play(props.changeValueSound);
    props.menu.className = MENU_HIDDEN;
    props.battleSimulatorStartNotifier.next();
  });
}
