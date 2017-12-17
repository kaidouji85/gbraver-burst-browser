// @flow

import type {Resources} from "../../../../resource/resource-manager";
import type {BattleSceneState} from "../../index";
import {createPlayerBatteryGauge} from "../../../../game-object/gauge/battery-gauge";

/**
 * ゲームの状態からプレイヤーバッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲーム状態
 */
export function createPlayerBatteryGaugeFromState(resources: Resources, state: BattleSceneState) {
  const playerInfo = state.battleState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  return createPlayerBatteryGauge(resources, playerInfo.armDozer.battery, playerInfo.armDozer.maxBattery);
}