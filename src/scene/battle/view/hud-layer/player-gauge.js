// @flow

import {PlayerGaugeContext} from "../../../../game-object/gauge/player-gauge";
import type {BattleSceneState} from "../../state";
import type {Resources} from "../../../../resource/resource-manager";

/** プレイヤーゲージを生成する */
export function createPlayerGauge(resources: Resources, state: BattleSceneState): PlayerGaugeContext {
  const gauge = new PlayerGaugeContext(resources);
  const playerInfo = state.battleState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  gauge.target.refresh(playerInfo.armDozer);
  return gauge;
}