// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {updateGauge} from "../update-gauge";
import type {BurstAnimationParam} from "./animation-param";
import {toBurstAnimationParam} from "./animation-param";
import {delay, empty} from "../../../../../../animation/delay";
import {shinBraverBurst, castShinBraverBurst} from "./shin-braver";
import {lightningDozerBurst, castLightningDozerBurst} from "./lightning-dozer";
import {neoLandozerBurst, castNeoLandozerBurst} from "./neo-landozer";
import {toWingDozerBurst, wingDozerBurst} from "./wingdozer";


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
  const shinBraverParam = castShinBraverBurst(param);
  if (shinBraverParam) {
    return shinBraverBurst(shinBraverParam);
  }

  const neoLandozer = castNeoLandozerBurst(param);
  if (neoLandozer) {
    return neoLandozerBurst(neoLandozer);
  }

  const lightningDozer = castLightningDozerBurst(param);
  if (lightningDozer) {
    return lightningDozerBurst(lightningDozer);
  }

  const wingDozer = toWingDozerBurst(param);
  if (wingDozer) {
    return wingDozerBurst(wingDozer);
  }

  return empty();
}