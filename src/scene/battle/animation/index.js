// @flow

import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {BattleSceneState} from "../state";
import {BattleSceneView} from "../view";

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーンの状態
 * @param gameStateList 再生するゲームの状態
 * @return アニメーション
 */
export function animation(view: BattleSceneView, sceneState: BattleSceneState, gameStateList: GameState[]): MultiTween {
  // TODO アニメーションを実装する
  return {
    start: new Tween({}),
    end: new Tween({}),
  };
}