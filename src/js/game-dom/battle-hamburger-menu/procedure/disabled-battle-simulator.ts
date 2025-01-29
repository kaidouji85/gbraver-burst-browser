import { BATTLE_SIMULATOR_DISABLED } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * バトルシミュレーターを選択不能にする
 * @param props プロパティ
 */
export function disabledBattleSimulator(props: BattleHamburgerMenuProps) {
  props.canBattleSimulatorStart = false;
  props.battleSimulator.className = BATTLE_SIMULATOR_DISABLED;
}
