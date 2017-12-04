// @flow

import {PlayerGauge} from "../../../../game-object/player-gauge";
import type {BattleAppState} from "../../state";
import type {Resources} from "../../../../resource/resource-manager";

/** プレイヤーゲージを生成する */
export function createPlayerGauge(resources: Resources, state: BattleAppState): PlayerGauge {
  const gauge = new PlayerGauge(resources);
  const playerInfo = state.battleState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  gauge._target.refresh(playerInfo.armDozer);
  return gauge;
}