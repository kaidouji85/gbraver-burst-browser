// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {empty} from "../../../../../animation/delay";
import {Animate} from "../../../../../animation/animate";

/**
 * パイロット効果 アニメーション
 *
 * @param view ビュー
 * @param sceneState シーン状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function pilotAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  return empty();
}
