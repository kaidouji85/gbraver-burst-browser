import {BattleSceneView} from "../view/index";
import type {BattleSceneState} from "../state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {createEmptyMultiTween} from "../../../tween/multi-tween/empty-multi-tween";
import {inputCommand} from "./input-command";

/**
 * ゲーム状態からアニメーションTweenを生成する
 *
 * @param view 戦闘シーンビュー
 * @param sceneState 戦闘シーン状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function gameStateDemo(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): MultiTween {
  switch (gameState.effect.name) {
    case 'InputCommand':
      return inputCommand(view, sceneState);
    default:
      return createEmptyMultiTween();
  }
}