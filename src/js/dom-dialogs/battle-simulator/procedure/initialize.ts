import { updateBattery } from "../dom/update-battery";
import { BattleSimulatorProps } from "../props";
import { updateBattleResult } from "./update-battle-result";

/**
 * ダイアログの初期化
 * @param props プロパティ
 */
export function initialize(props: BattleSimulatorProps) {
  const { playerElements, playerBattery, enemyElements, enemyBattery } = props;
  updateBattery(playerElements, playerBattery);
  updateBattery(enemyElements, enemyBattery);
  updateBattleResult(props);
}
