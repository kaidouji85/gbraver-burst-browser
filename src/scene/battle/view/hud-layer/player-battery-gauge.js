// @flow

import type {Resources} from "../../../../resource/index";
import {PlayerBatteryGauge} from "../../../../game-object/gauge/battery-gauge";
import {BatteryGauge} from "../../../../game-object/gauge/battery-gauge/battery-gauge";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/**
 * ゲームの状態からプレイヤーバッテリーゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲーム状態
 */
export function createPlayerBatteryGauge(resources: Resources, playerId: PlayerId, players: Player[]): BatteryGauge {
  const playerInfo = players.find(v => v.playerId === playerId) || players[0];
  return PlayerBatteryGauge(resources, playerInfo.armdozer.maxBattery, playerInfo.armdozer.maxBattery);
}