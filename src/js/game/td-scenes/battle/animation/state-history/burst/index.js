// @flow
import type {BurstEffect, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {ShinBraverHUD} from "../../../view/hud/armdozer-objects/shin-braver";
import {ShinBraverTD} from "../../../view/td/armdozer-objects/shin-braver";
import type {StateAnimationProps} from "../state-animation-props";
import type {BurstAnimationParam} from "./animation-param";
import {toBurstAnimationParam} from "./animation-param";
import {castLightningDozerBurst, lightningDozerBurst} from "./lightning-dozer";
import {castNeoLandozerBurst, neoLandozerBurst} from "./neo-landozer";
import {shinBraverBurst} from "./shin-braver";
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
  if ((param.burstArmdozerTD instanceof ShinBraverTD) && (param.burstArmdozerHUD instanceof ShinBraverHUD)) {
    const burstArmdozerTD: ShinBraverTD = param.burstArmdozerTD;
    const burstArmdozerHUD: ShinBraverHUD = param.burstArmdozerHUD;
    return shinBraverBurst({...param, burstArmdozerTD, burstArmdozerHUD});
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