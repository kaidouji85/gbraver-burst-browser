// @flow

import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {BattleSceneState} from "../state/battle-scene-state";
import {BattleSceneView} from "../view/index";
import {inputCommandAnimation} from "./input-command";

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーンの状態
 * @param gameStateList 再生するゲームの状態
 * @return アニメーション
 */
export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameStateList: GameState[]): void {
  const multiTween = gameStateList
    .map(v => gameStateAnimation(view, sceneState, v))
    .reduce((accumlator: MultiTween, current: MultiTween) => {
      accumlator.end.chain(current.start);
      return {
        start: accumlator.start,
        end: current.end
      };
    }, createEmptyMultiTween());
  multiTween.start.start();
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
    default:
      return createEmptyMultiTween();
  }
}