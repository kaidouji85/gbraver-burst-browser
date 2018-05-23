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
export function animation(view: BattleSceneView, sceneState: BattleSceneState, gameStateList: GameState[]): void {
  const multiTween = gameStateList
    .map(v => getAnimation(view, sceneState, v))
    .reduce((a: MultiTween, b: MultiTween) => {
      b.end.chain(a.start);
      return {
        start: b.start,
        end: a.end
      };
    }, emptyMultiTween());
  multiTween.start.start();
}

export function getAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): MultiTween {
  switch (gameState.effect.name) {
    case 'InputCommand':
      return inputCommand(view, sceneState);
    default:
      return emptyMultiTween();
  }
}

export function inputCommand(view: BattleSceneView, sceneState: BattleSceneState): MultiTween {
  const start = new Tween({}).to({}, 0);
  const end = view.hudLayer.attackButton.visibleAnimation(true);

  start.chain(end);
  return {start, end}
}

export function emptyMultiTween(): MultiTween {
  return {
    start: new Tween({}).to({}, 0),
    end: new Tween({}).to({}, 0),
  };
}