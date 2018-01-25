// @flow

import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../index";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import {EnemyBatteryGauge} from "../../../../game-object/gauge/battery-gauge";

/**
 * ゲームの状態から敵バッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @returns 敵バッテリーゲージ
 */
export function createEnemyBatteryGauge(resources: Resources, state: BattleSceneState): BatteryGauge {
  const enemyInfo = state.battleState.players.find(v => v.playerId !== state.playerId) || state.battleState.players[0];
  return EnemyBatteryGauge(resources, enemyInfo.armDozer.battery, enemyInfo.armDozer.maxBattery);
}