// @flow
import type {BurstEffect, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import type {StateAnimationProps} from "../state-animation-props";
import type {BurstAnimationParam} from "./animation-param";
import {toBurstAnimationParam} from "./animation-param";
import {castLightningDozerBurst, lightningDozerBurst} from "./lightning-dozer";
import {castNeoLandozerBurst, neoLandozerBurst} from "./neo-landozer";
import {castShinBraverBurst, shinBraverBurst} from "./shin-braver";
import {castWingDozerBurst, wingDozerBurst} from "./wingdozer";

/**
 * バーストアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲーム状態
 * @return バーストアニメーション
 */
export function burstAnimation(props: StateAnimationProps, gameState: GameStateX<BurstEffect>): Animate {
  const param = toBurstAnimationParam(props, gameState);
  if (!param) {
    return empty();
  }

  return armdozerAnimation(param);
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