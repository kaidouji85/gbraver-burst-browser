// @flow

import type {Resources} from "../../../../resource/resource-manager";
import type {BattleSceneState} from "../../index";
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/base";
import {EnemyHpGauge} from "../../../../game-object/gauge/hp-gauge";

/**
 * ゲームの状態から敵HPゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @return 敵HPゲージ
 */
export function createEnemyHpGauge(resources: Resources, state: BattleSceneState): HpGauge {
  const enemyInfo = state.battleState.players.find(v => v.playerId !== state.playerId) || state.battleState.players[0];
  return EnemyHpGauge(resources, enemyInfo.armDozer.hp, enemyInfo.armDozer.maxHp);
}