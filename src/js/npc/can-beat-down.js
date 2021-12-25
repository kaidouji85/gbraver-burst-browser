// @flow

import {battleResult, updateDefender, isPlayerDeath, correctedBattery} from "gbraver-burst-core";
import type {PlayerState} from "gbraver-burst-core";

/**
 * 攻撃側が防御側を倒すことができるか否かを判定する
 *
 * @param attacker 攻撃側のステータス
 * @param attackBattery 攻撃側が出すバッテリー
 * @param defender 防御側のステータス
 * @param defenseBattery 防御側が出すバッテリー
 * @return 判定結果、trueで確実に倒せる
 */
export function canBeatDown(attacker: PlayerState, attackBattery: number, defender: PlayerState, defenseBattery: number): boolean {
  const correctedAttackBattery = correctedBattery({type: 'BATTERY_COMMAND', battery: attackBattery}, attacker.armdozer.effects);
  const correctedDefenseBattery = correctedBattery({type: 'BATTERY_COMMAND', battery: defenseBattery}, defender.armdozer.effects);
  const result = battleResult(attacker, correctedAttackBattery, defender, correctedDefenseBattery);
  const updatedDefender = updateDefender(result, defender);
  return isPlayerDeath(updatedDefender);
}