// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import {updateGauge} from "../update-gauge";
import type {BurstAnimationParam} from "./animation-param";
import {overWriteSprite, toBurstAnimationParam} from "./animation-param";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {shinBraverBurst} from "./shin-braver";
import type {ArmdozerState} from "gbraver-burst-core/lib/game-state/armdozer/armdozer-state";
import {delay, empty} from "../../../../../../animation/delay";
import type {Burst} from "gbraver-burst-core/lib/armdozer/burst";

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
function armdozerAnimation(param: BurstAnimationParam<ArmdozerState, Burst>): Animate {
  const sprite = param.burstPlayerTD.sprite;
  if (sprite instanceof ShinBraver) {
    return shinBraverBurst(overWriteSprite(param, sprite));
  }

  return empty();
}