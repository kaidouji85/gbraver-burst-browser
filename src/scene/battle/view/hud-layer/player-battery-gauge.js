// @flow

import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../state";
import {PlayerBatteryGauge} from "../../../../game-object/gauge/battery-gauge";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

/**
 * ゲームの状態からプレイヤーバッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲーム状態
 */
export function createPlayerBatteryGauge(resources: Resources, state: BattleSceneState): BatteryGauge {
  // TODO 配列の要素数チェックをする
  const lastState: GameState = state.battleState[state.battleState.length - 1];
  const playerInfo = lastState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  return PlayerBatteryGauge(resources, playerInfo.armdozer.battery, playerInfo.armdozer.maxBattery);
}