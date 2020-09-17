// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameStateX} from "gbraver-burst-core";
import type {BurstAnimationParam} from "./animation-param";
import {toBurstAnimationParam} from "./animation-param";
import {delay, empty} from "../../../../../../animation/delay";
import {castShinBraverBurst, shinBraverBurst} from "./shin-braver";
import {castLightningDozerBurst, lightningDozerBurst} from "./lightning-dozer";
import {castNeoLandozerBurst, neoLandozerBurst} from "./neo-landozer";
import {castWingDozerBurst, wingDozerBurst} from "./wingdozer";
import type {BurstEffect} from "gbraver-burst-core/lib/effect/burst/burst-effect";

/**
 * バーストアニメーション
 *
 * @param view ビュー
 * @param sceneState シーン情報
 * @param gameState ゲーム状態
 * @return バーストアニメーション
 */
export function burstAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<BurstEffect>): Animate {
  const param = toBurstAnimationParam(view, sceneState, gameState);
  if (!param) {
    return empty();
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

  const wingDozer = castWingDozerBurst(param);
  if (wingDozer) {
    return wingDozerBurst(wingDozer);
  }

  return empty();
}