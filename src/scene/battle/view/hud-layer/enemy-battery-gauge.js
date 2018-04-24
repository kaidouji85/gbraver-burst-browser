// @flow

import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../state";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import {EnemyBatteryGauge} from "../../../../game-object/gauge/battery-gauge";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

/**
 * ゲームの状態から敵バッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @returns 敵バッテリーゲージ
 */
export function createEnemyBatteryGauge(resources: Resources, state: BattleSceneState): BatteryGauge {
  // TODO 配列の要素数チェックをする
  const lastState: GameState = state.battleState[state.battleState.length - 1];
  const enemyInfo = lastState.players.find(v => v.playerId !== state.playerId) || state.battleState.players[0];
  return EnemyBatteryGauge(resources, enemyInfo.armdozer.battery, enemyInfo.armdozer.maxBattery);
}