// @flow

import {Animate} from "../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {empty} from "../../../../animation/delay";
import {inputCommandAnimation} from "./input-command";
import {battleAnimation} from "./battle";
import {turnChangeAnimation} from "./turn-change";
import {updateGauge} from "./update-gauge";

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーンの状態
 * @param gameStateList 再生するゲームの状態
 * @return アニメーション
 */
export function stateHistoryAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameStateList: GameState[]): Animate {
  return gameStateList
    .map(v => {
      switch (v.effect.name) {
        case 'InputCommand':
          return inputCommandAnimation(view, sceneState, v);
        case 'Battle':
          return battleAnimation(view, sceneState, v);
        case 'TurnChange':
          return turnChangeAnimation(view, sceneState, v);
        // TODO 素敵なバーストアニメーションを作る
        case 'BurstEffect':
          return updateGauge(view, sceneState, v);
        default:
          return empty();
      }
    })
    .reduce((a, b) => a.chain(b), empty());
}