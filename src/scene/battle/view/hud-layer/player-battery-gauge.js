// @flow

import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../index";
import {PlayerBatteryGauge} from "../../../../game-object/gauge/battery-gauge";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";

/**
 * ゲームの状態からプレイヤーバッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲーム状態
 */
export function createPlayerBatteryGauge(resources: Resources, state: BattleSceneState): BatteryGauge {
  const playerInfo = state.battleState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  return PlayerBatteryGauge(resources, playerInfo.armDozer.battery, playerInfo.armDozer.maxBattery);
}