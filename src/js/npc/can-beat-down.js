// @flow

import {battleResult, updateDefender, isPlayerDeath} from "gbraver-burst-core";
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
  const result = battleResult(attacker, attackBattery, defender, defenseBattery);
  const updatedDefender = updateDefender(result, defender);
  return isPlayerDeath(updatedDefender);
}