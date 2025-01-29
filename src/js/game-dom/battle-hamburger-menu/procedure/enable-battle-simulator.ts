import { BATTLE_SIMULATOR } from "../dom/class-name";
import { BattleHamburgerMenuProps } from "../props";

/**
 * バトルシミュレーターを選択可能にする
 * @param props プロパティ
 */
export function enableBattleSimulator(props: BattleHamburgerMenuProps) {
  props.canBattleSimulatorStart = true;
  props.battleSimulator.className = BATTLE_SIMULATOR;
}
