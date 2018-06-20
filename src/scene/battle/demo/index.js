// @flow

import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";
import {Tween} from '@tweenjs/tween.js';
import type {BattleSceneState} from "../state";
import {BattleSceneView} from "../view/index";
import {gameStateDemo} from "./game-state-demo";

/**
 * 状態に応じた戦闘シーンのアニメーションを再生する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーンの状態
 * @param gameStateList 再生するゲームの状態
 * @return アニメーション
 */
export function battleDemo(view: BattleSceneView, sceneState: BattleSceneState, gameStateList: GameState[]): void {
  const multiTween = gameStateList
    .map(v => gameStateDemo(view, sceneState, v))
    .reduce((a: MultiTween, b: MultiTween) => {
      b.end.chain(a.start);
      return {
        start: b.start,
        end: a.end
      };
    }, createEmptyMultiTween());
  multiTween.start.start();
}