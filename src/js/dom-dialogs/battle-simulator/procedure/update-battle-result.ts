import {
  BattleResult,
  battleResult,
  correctedBattery,
  PlayerState,
} from "gbraver-burst-core";

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
 * プレイヤーが攻撃側の場合の戦闘結果を取得する
 * @param props プロパティ
 * @returns 戦闘結果
 */
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

/**
 * 敵が攻撃側の場合の戦闘結果を取得する
 * @param props プロパティ
 * @returns 戦闘結果
 */
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

/**
 * 現在の画面入力内容から戦闘結果を更新する
 * @param props プロパティ
 */
export const updateBattleResult = (props: BattleSimulatorProps) => {
  const { isPlayerAttacker, playerElements, enemyElements } = props;
  const battleResult = isPlayerAttacker
    ? getBattleResultOnPlayerAttacker(props)
    : getBattleResultOnEnemyAttacker(props);
  const defenderElements = isPlayerAttacker ? enemyElements : playerElements;
  updateDamage(defenderElements, battleResult);
};
