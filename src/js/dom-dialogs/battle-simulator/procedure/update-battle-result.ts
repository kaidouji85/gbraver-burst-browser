import {
  BattleResult,
  battleResult,
  correctedBattery,
  PlayerState,
} from "gbraver-burst-core";

import { updateDamage } from "../dom/update-damage";
import { BattleSimulatorProps } from "../props";

const getCorrectedBattery = (player: PlayerState, battery: number) =>
  correctedBattery(
    {
      type: "BATTERY_COMMAND",
      battery,
    },
    player.armdozer.effects,
  );

const getBattleResultOnPlayerAttacker = (
  props: BattleSimulatorProps,
): BattleResult => {
  const { player, playerBattery, enemy, enemyBattery } = props;
  const attacker = player;
  const attackerBattery = getCorrectedBattery(player, playerBattery);
  const defender = enemy;
  const defenderBattery = getCorrectedBattery(enemy, enemyBattery);
  return battleResult(attacker, attackerBattery, defender, defenderBattery);
};

const getBattleResultOnEnemyAttacker = (
  props: BattleSimulatorProps,
): BattleResult => {
  const { player, playerBattery, enemy, enemyBattery } = props;
  const attacker = enemy;
  const attackerBattery = getCorrectedBattery(enemy, enemyBattery);
  const defender = player;
  const defenderBattery = getCorrectedBattery(player, playerBattery);
  return battleResult(attacker, attackerBattery, defender, defenderBattery);
};

export const updateBattleResult = (props: BattleSimulatorProps) => {
  const { isPlayerAttacker, playerElements, enemyElements } = props;
  const battleResult = isPlayerAttacker
    ? getBattleResultOnPlayerAttacker(props)
    : getBattleResultOnEnemyAttacker(props);
  const defenderElements = isPlayerAttacker ? enemyElements : playerElements;
  updateDamage(defenderElements, battleResult);
};
