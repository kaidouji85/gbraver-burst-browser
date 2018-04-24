// @flow

import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../state";
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/hp-gauge";
import {EnemyHpGauge} from "../../../../game-object/gauge/hp-gauge";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

/**
 * ゲームの状態から敵HPゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @return 敵HPゲージ
 */
export function createEnemyHpGauge(resources: Resources, state: BattleSceneState): HpGauge {
  // TODO 配列の要素数チェックをする
  const lastState: GameState = state.battleState[state.battleState.length - 1];
  const enemyInfo = lastState.players.find(v => v.playerId !== state.playerId) || state.battleState.players[0];
  return EnemyHpGauge(resources, enemyInfo.armdozer.hp, enemyInfo.armdozer.maxHp);
}