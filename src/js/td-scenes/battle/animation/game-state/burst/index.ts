import type { BurstEffect, GameStateX } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { GenesisBraverHUD } from "../../../view/hud/armdozer-objects/genesis-braver";
import { LightningDozerHUD } from "../../../view/hud/armdozer-objects/lightning-dozer";
import { NeoLandozerHUD } from "../../../view/hud/armdozer-objects/neo-landozer";
import { ShinBraverHUD } from "../../../view/hud/armdozer-objects/shin-braver";
import { WingDozerHUD } from "../../../view/hud/armdozer-objects/wing-dozer";
import { GenesisBraverTD } from "../../../view/td/armdozer-objects/genesis-braver";
import { LightningDozerTD } from "../../../view/td/armdozer-objects/lightning-dozer";
import { NeoLandozerTD } from "../../../view/td/armdozer-objects/neo-landozer";
import { ShinBraverTD } from "../../../view/td/armdozer-objects/shin-braver";
import { WingDozerTD } from "../../../view/td/armdozer-objects/wing-dozer";
import type { StateAnimationProps } from "../state-animation-props";
import type { BurstAnimationParam } from "./animation-param";
import { toBurstAnimationParam } from "./animation-param";
import { genesisBraverBurst } from "./genesis-braver";
import { lightningDozerBurst } from "./lightning-dozer";
import { neoLandozerBurst } from "./neo-landozer";
import { shinBraverBurst } from "./shin-braver";
import { wingDozerBurst } from "./wingdozer";

/**
 * バーストアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲーム状態
 * @returns バーストアニメーション
 */
export function burstAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<BurstEffect>,
): Animate {
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
 * @returns バーストアニメーション
 */
function armdozerAnimation(param: BurstAnimationParam): Animate {
  if (
    param.burstArmdozerTD instanceof ShinBraverTD &&
    param.burstArmdozerHUD instanceof ShinBraverHUD
  ) {
    const burstArmdozerTD: ShinBraverTD = param.burstArmdozerTD;
    const burstArmdozerHUD: ShinBraverHUD = param.burstArmdozerHUD;
    return shinBraverBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  }

  if (
    param.burstArmdozerTD instanceof NeoLandozerTD &&
    param.burstArmdozerHUD instanceof NeoLandozerHUD
  ) {
    const burstArmdozerTD: NeoLandozerTD = param.burstArmdozerTD;
    const burstArmdozerHUD: NeoLandozerHUD = param.burstArmdozerHUD;
    return neoLandozerBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  }

  if (
    param.burstArmdozerTD instanceof LightningDozerTD &&
    param.burstArmdozerHUD instanceof LightningDozerHUD
  ) {
    const burstArmdozerTD: LightningDozerTD = param.burstArmdozerTD;
    const burstArmdozerHUD: LightningDozerHUD = param.burstArmdozerHUD;
    return lightningDozerBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  }

  if (
    param.burstArmdozerTD instanceof WingDozerTD &&
    param.burstArmdozerHUD instanceof WingDozerHUD
  ) {
    const burstArmdozerTD: WingDozerTD = param.burstArmdozerTD;
    const burstArmdozerHUD: WingDozerHUD = param.burstArmdozerHUD;
    return wingDozerBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  }

  if (
    param.burstArmdozerTD instanceof GenesisBraverTD &&
    param.burstArmdozerHUD instanceof GenesisBraverHUD
  ) {
    const burstArmdozerTD: GenesisBraverTD = param.burstArmdozerTD;
    const burstArmdozerHUD: GenesisBraverHUD = param.burstArmdozerHUD;
    return genesisBraverBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  }

  return empty();
}
