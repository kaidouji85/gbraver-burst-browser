// @flow

import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../state";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import {EnemyBatteryGauge} from "../../../../game-object/gauge/battery-gauge";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/**
 * ゲームの状態から敵バッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @returns 敵バッテリーゲージ
 */
export function createEnemyBatteryGauge(resources: Resources, playerId: PlayerId, players: Player[]): BatteryGauge {
  const enemyInfo = players.find(v => v.playerId !== playerId) || players[0];
  return EnemyBatteryGauge(resources, enemyInfo.armdozer.maxBattery, enemyInfo.armdozer.maxBattery);
}