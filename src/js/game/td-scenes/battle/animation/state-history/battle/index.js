// @flow

import type {Battle, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import {BattleSceneView} from "../../../view";
import {toBattleAnimationParam} from "./animation-param";
import {attackAnimation} from "./attack";

/**
 * 戦闘アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return アニメーション
 */
export function battleAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<Battle>): Animate {
  const param = toBattleAnimationParam(view, sceneState, gameState);
  if (!param) {
    return empty();
  }

  return attackAnimation(param);
}

