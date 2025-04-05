import { BurstEffect, GameStateX } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { GenesisBraverHUD } from "../../../view/hud/armdozer-objects/genesis-braver";
import { GranDozerHUD } from "../../../view/hud/armdozer-objects/gran-dozer";
import { LightningDozerHUD } from "../../../view/hud/armdozer-objects/lightning-dozer";
import { NeoLandozerHUD } from "../../../view/hud/armdozer-objects/neo-landozer";
import { ShinBraverHUD } from "../../../view/hud/armdozer-objects/shin-braver";
import { WingDozerHUD } from "../../../view/hud/armdozer-objects/wing-dozer";
import { GenesisBraverTD } from "../../../view/td/armdozer-objects/genesis-braver";
import { GranDozerTD } from "../../../view/td/armdozer-objects/gran-dozer";
import { LightningDozerTD } from "../../../view/td/armdozer-objects/lightning-dozer";
import { NeoLandozerTD } from "../../../view/td/armdozer-objects/neo-landozer";
import { ShinBraverTD } from "../../../view/td/armdozer-objects/shin-braver";
import { WingDozerTD } from "../../../view/td/armdozer-objects/wing-dozer";
import { StateAnimationProps } from "../state-animation-props";
import { BurstAnimationParam } from "./animation-param";
import { toBurstAnimationParam } from "./animation-param";
import { genesisBraverBurst } from "./genesis-braver";
import { granDozerBurst } from "./gran-dozer";
import { lightningDozerBurst } from "./lightning-dozer";
import { neoLandozerBurst } from "./neo-landozer";
import { shinBraverBurst } from "./shin-braver";
import { wingDozerBurst } from "./wingdozer";

/**
 * アームドーザごとのバーストアニメーション
 *
 * @param param バーストアニメパラメータ
 * @returns バーストアニメーション
 */
function armdozerAnimation(param: BurstAnimationParam): Animate {
  const { burstArmdozerTD, burstArmdozerHUD } = param;
  let ret = empty();
  if (
    burstArmdozerTD instanceof ShinBraverTD &&
    burstArmdozerHUD instanceof ShinBraverHUD
  ) {
    ret = shinBraverBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  } else if (
    burstArmdozerTD instanceof NeoLandozerTD &&
    burstArmdozerHUD instanceof NeoLandozerHUD
  ) {
    ret = neoLandozerBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  } else if (
    burstArmdozerTD instanceof LightningDozerTD &&
    burstArmdozerHUD instanceof LightningDozerHUD
  ) {
    ret = lightningDozerBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  } else if (
    burstArmdozerTD instanceof WingDozerTD &&
    burstArmdozerHUD instanceof WingDozerHUD
  ) {
    ret = wingDozerBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  } else if (
    burstArmdozerTD instanceof GenesisBraverTD &&
    burstArmdozerHUD instanceof GenesisBraverHUD
  ) {
    ret = genesisBraverBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  } else if (
    burstArmdozerTD instanceof GranDozerTD &&
    burstArmdozerHUD instanceof GranDozerHUD
  ) {
    ret = granDozerBurst({ ...param, burstArmdozerTD, burstArmdozerHUD });
  }

  return ret;
}

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
  return param ? armdozerAnimation(param) : empty();
}
