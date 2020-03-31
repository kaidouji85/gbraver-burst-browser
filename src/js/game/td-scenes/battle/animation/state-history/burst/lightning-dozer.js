// @flow

import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {LightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import type {HUDArmdozer} from "../../../view/hud/armdozer";
import {LightningDozerTD} from "../../../view/td/armdozer/lightning-dozer";
import type {Burst} from "gbraver-burst-core/lib/player/armdozer/burst";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";

/**
 * ライトニングドーザ バーストアニメーションパラメータ
 *
 * @type BURST バースト
 */
export type LightningDozerBurstAnimationParam<BURST> = BurstAnimationParamX<LightningDozer, HUDArmdozer, LightningDozerTD, BURST>;

/**
 * ライトニングドーザ バーストアニメーションパラメータにキャストする
 * キャストできない場合はnullを返すkaesu
 *
 * @param param 変換元
 * @return 変換結果
 */
export function toLightningDozerBurstAnimationParam(param: BurstAnimationParam): ?LightningDozerBurstAnimationParam<Burst> {
  if ((param.burstSprite instanceof LightningDozer) && (param.burstArmdozerTD instanceof LightningDozerTD)) {
    const sprite: LightningDozer = param.burstSprite;
    const armdozerTD: LightningDozerTD = param.burstArmdozerTD;
    return ((param: any): BurstAnimationParamX<typeof sprite, typeof param.burstArmdozerHUD, typeof armdozerTD, typeof param.burst>);
  }

  return null;
}

/**
 * ライトニングドーザ バーストアニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function lightningDozerBurst(param: LightningDozerBurstAnimationParam<Burst>): Animate {
  // TODO アニメーションを実装する
  return empty();
}
