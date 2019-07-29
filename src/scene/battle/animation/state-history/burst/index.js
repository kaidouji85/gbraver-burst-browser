// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {updateGauge} from "../update-gauge";
import {toBurstAnimationParam} from "./animation-param";

/**
 * バーストアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン情報
 * @param gameState ゲーム状態
 * @return バーストアニメーション
 */
export function burstAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  // TODO 素敵なバーストアニメーションを作る
  const param = toBurstAnimationParam(view, sceneState, gameState);
  return updateGauge(view, sceneState, gameState);
}