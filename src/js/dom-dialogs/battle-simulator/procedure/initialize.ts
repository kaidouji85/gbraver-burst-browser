import { updateBattery } from "../dom/update-battery";
import { updateHP } from "../dom/update-hp";
import { BattleSimulatorProps } from "../props";
import { updateBattleResult } from "./update-battle-result";

/**
 * ダイアログの初期化
 * @param props プロパティ
 */
export function initialize(props: BattleSimulatorProps) {
  const {
    isPlayerAttacker,
    player,
    playerElements,
    playerBattery,
    enemy,
    enemyElements,
    enemyBattery,
  } = props;
  updateBattery(playerElements, playerBattery);
  updateBattery(enemyElements, enemyBattery);
  isPlayerAttacker
    ? updateHP(enemyElements, enemy.armdozer.hp)
    : updateHP(playerElements, player.armdozer.hp);
  updateBattleResult(props);
}
