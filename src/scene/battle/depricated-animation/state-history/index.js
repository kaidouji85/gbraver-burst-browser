// @flow

import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {MultiTween} from "../../../../depricated-tween/multi-tween/multi-tween";
import {createEmptyMultiTween} from "../../../../depricated-tween/multi-tween/empty-multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {BattleSceneState} from "../../state/battle-scene-state";
import {BattleSceneView} from "../../view/index";
import {inputCommandAnimation} from "./input-command";
import {battleAnimation} from "./battle";

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーンの状態
 * @param gameStateList 再生するゲームの状態
 * @return アニメーション
 */
export function stateHistoryAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameStateList: GameState[]): MultiTween {
  return gameStateList
    .map(v => gameStateAnimation(view, sceneState, v))
    .reduce((accumlator: MultiTween, current: MultiTween) => {
      accumlator.end.chain(current.start);
      return {
        start: accumlator.start,
        end: current.end
      };
    }, createEmptyMultiTween());
}

/**
 * ゲーム状態に応じたアニメーションを生成する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーン状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
function gameStateAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): MultiTween {
  switch (gameState.effect.name) {
    case 'InputCommand':
      return inputCommandAnimation(view, sceneState, gameState, gameState.effect);
    case 'Battle':
      return battleAnimation(view, sceneState, gameState, gameState.effect);
    default:
      return createEmptyMultiTween();
  }
}