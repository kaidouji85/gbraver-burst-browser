// @flow

import {Animate} from "../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {visibleBattery} from "./visible-battery";
import {delay} from "../../../../../animation/delay";
import {attackAnimation} from "./attack";

/**
 * 戦闘アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return アニメーション
 */
export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  return visibleBattery(view, sceneState, gameState)
    .chain(delay(500))
    .chain(attackAnimation(view, sceneState, gameState))
    .chain(delay(500));
}

