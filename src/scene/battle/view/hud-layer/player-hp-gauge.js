// @flow

import type {BattleSceneState} from "../../index";
import type {Resources} from "../../../../resource/resource-manager";
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/base";
import {PlayerHpGauge as create} from '../../../../game-object/gauge/hp-gauge';

/**
 * ゲームの状態からプレイヤーHPゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @return プレイヤーHPゲージ
 */
export function createPlayerHpGauge(resources: Resources, state: BattleSceneState): HpGauge {
  const playerInfo = state.battleState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  return create(resources, playerInfo.armDozer.hp, playerInfo.armDozer.maxHp);
}