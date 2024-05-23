import {
  battleResult,
  correctedBattery,
  PlayerState,
} from "gbraver-burst-core";

import { updateBatteryCorrect } from "../dom/update-battery-correct";
import { updateBattleResultName } from "../dom/update-battle-result-name";
import { updateDamage } from "../dom/update-damage";
import { BattleSimulatorProps } from "../props";

/**
 * 補正されたバッテリーを取得する
 * @param player プレイヤーのステート
 * @param battery プレイヤーが出したバッテリー
 * @returns 計算結果
 */
const getCorrectedBattery = (player: PlayerState, battery: number) =>
  correctedBattery(
    {
      type: "BATTERY_COMMAND",
      battery,
    },
    player.armdozer.effects,
  );

/**
 * プレイヤーが攻撃側の場合、各種オブジェクトを攻撃、防御側に分割する
 * @param props プロパティ
 * @returns 分割結果
 */
const divideOnPlayerAttacker = (props: BattleSimulatorProps) => {
  const {
    player,
    playerBattery,
    playerElements,
    enemy,
    enemyBattery,
    enemyElements,
  } = props;
  return {
    attacker: player,
    originAttackerBattery: playerBattery,
    attackerBattery: getCorrectedBattery(player, playerBattery),
    attackerElements: playerElements,
    defender: enemy,
    originDefenderBattery: enemyBattery,
    defenderBattery: getCorrectedBattery(enemy, enemyBattery),
    defenderElements: enemyElements,
  };
};

/**
 * 敵が攻撃側の場合、各種オブジェクトを攻撃、防御側に分割する
 * @param props プロパティ
 * @returns 分割結果
 */
const divideOnEnemyAttacker = (props: BattleSimulatorProps) => {
  const {
    player,
    playerBattery,
    playerElements,
    enemy,
    enemyBattery,
    enemyElements,
  } = props;
  return {
    attacker: enemy,
    originAttackerBattery: enemyBattery,
    attackerBattery: getCorrectedBattery(enemy, enemyBattery),
    attackerElements: enemyElements,
    defender: player,
    originDefenderBattery: playerBattery,
    defenderBattery: getCorrectedBattery(player, playerBattery),
    defenderElements: playerElements,
  };
};

/**
 * 現在の画面入力内容から戦闘結果を更新する
 * @param props プロパティ
 */
export const updateBattleResult = (props: BattleSimulatorProps) => {
  const { isPlayerAttacker } = props;
  const {
    attacker,
    originAttackerBattery,
    attackerBattery,
    attackerElements,
    defender,
    originDefenderBattery,
    defenderBattery,
    defenderElements,
  } = isPlayerAttacker
    ? divideOnPlayerAttacker(props)
    : divideOnEnemyAttacker(props);
  const result = battleResult(
    attacker,
    attackerBattery,
    defender,
    defenderBattery,
  );
  updateBattleResultName(defenderElements, result);
  updateDamage(defenderElements, result);

  const attackerBatteryCorrect = attackerBattery - originAttackerBattery;
  updateBatteryCorrect(attackerElements, attackerBatteryCorrect);

  const defenderBatteryCorrect = defenderBattery - originDefenderBattery;
  updateBatteryCorrect(defenderElements, defenderBatteryCorrect);
};
