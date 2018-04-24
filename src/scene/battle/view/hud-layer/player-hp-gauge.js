// @flow

import type {BattleSceneState} from "../../state";
import type {Resources} from "../../../../resource/index";
import {HpGauge} from "../../../../game-object/gauge/hp-gauge/hp-gauge";
import {PlayerHpGauge as create} from '../../../../game-object/gauge/hp-gauge';
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

/**
 * ゲームの状態からプレイヤーHPゲージを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param state ゲームの状態
 * @return プレイヤーHPゲージ
 */
export function createPlayerHpGauge(resources: Resources, state: BattleSceneState): HpGauge {
// TODO 配列の要素数チェックをする
  const lastState: GameState = state.battleState[state.battleState.length - 1];
  const playerInfo = lastState.players.find(v => v.playerId === state.playerId) || state.battleState.players[0];
  return create(resources, playerInfo.armdozer.hp, playerInfo.armdozer.maxHp);
}