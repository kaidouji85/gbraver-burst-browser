// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {updateGauge} from "../update-gauge";
import type {BurstAnimationParam} from "./animation-param";
import {toBurstAnimationParam} from "./animation-param";
import {delay, empty} from "../../../../../../animation/delay";
import {shinBraverBurst, toShinBraverBurstParam} from "./shin-braver";

/**
 * バーストアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン情報
 * @param gameState ゲーム状態
 * @return バーストアニメーション
 */
export function burstAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const param = toBurstAnimationParam(view, sceneState, gameState);
  if (!param) {
    return updateGauge(view, sceneState, gameState);
  }
  return delay(500)
    .chain(armdozerAnimation(param))
    .chain(delay(500))
}

/**
 * アームドーザごとのバーストアニメーション
 *
 * @param param バーストアニメパラメータ
 * @return バーストアニメーション
 */
function armdozerAnimation(param: BurstAnimationParam): Animate {
  const shinBraverParam = toShinBraverBurstParam(param);
  if (shinBraverParam) {
    return shinBraverBurst(shinBraverParam);
  }

  return empty();
}