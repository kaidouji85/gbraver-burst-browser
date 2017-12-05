// @flow

import type {Resources} from "../../../../resource/resource-manager";
import type {BattleSceneState} from "../../state";
import {EnemyGaugeContext} from "../../../../game-object/gauge/enemy-gauge";

export function createEnemyGauge(resources: Resources, state: BattleSceneState) {
  const gauge = new EnemyGaugeContext(resources);
  const enemyInfo = state.battleState.players.find(v => v.playerId !== state.playerId) || state.battleState.players[0];
  gauge.target.refresh(enemyInfo.armDozer);
  return gauge;
}