// @flow

import type {BattleSceneState} from "../../state";
import type {Resources} from "../../../../resource/resource-manager";
import {PlayerHpGaugeContext} from "../../../../game-object/gauge/player-hp-gauge";

export function createPlayerHpGauge(resources: Resources, state: BattleSceneState): PlayerHpGaugeContext {
  const playerInfo = state.battleState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  const gauge = new PlayerHpGaugeContext({
    resources: resources,
    hp: playerInfo.armDozer.hp,
    maxHp: playerInfo.armDozer.maxHp
  });
  return gauge;
}