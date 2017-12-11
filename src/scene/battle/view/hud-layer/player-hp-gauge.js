// @flow

import type {BattleSceneState} from "../../index";
import type {Resources} from "../../../../resource/resource-manager";
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/base";
import {createPlayerHpGauge as create} from '../../../../game-object/gauge/hp-gauge';

export function createPlayerHpGauge(resources: Resources, state: BattleSceneState): HpGauge {
  const playerInfo = state.battleState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  return create(resources, playerInfo.armDozer.hp, playerInfo.armDozer.maxHp);
}