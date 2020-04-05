// @flow

import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {LightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import type {HUDArmdozer} from "../../../view/hud/armdozer";
import {LightningDozerTD} from "../../../view/td/armdozer/lightning-dozer";
import type {Burst, LightningBarrier} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";

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
  if (param.burst.type === 'LightningBarrier') {
    const castBurst: LightningBarrier = param.burst;
    const castParam= ((param: any):LightningDozerBurstAnimationParam<typeof castBurst>);
    return lightningBarrier(castParam);
  }

  return empty();
}

/**
 * 電撃バリア
 *
 * @param param パラメータ
 * @return アニメーション
 */
function lightningBarrier(param: LightningDozerBurstAnimationParam<LightningBarrier>): Animate {
  return all(
    attentionArmDozer(param.tdCamera, param.burstSprite, 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.tdObjects.turnIndicator.invisible()
  ).chain(delay(1000)
  ).chain(param.burstSprite.turnStart()
  ).chain(param.burstArmdozerTD.lightningBarrier.show()
  ).chain(delay(1000)
  ).chain(all(
    param.burstPlayerTD.gauge.battery(param.burstPlayerState.armdozer.battery),
    param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
  )).chain(delay(1000)
  ).chain(all(
    toInitial(param.tdCamera, 500),
    param.burstSprite.turnStartToStand(),
    param.tdObjects.skyBrightness.brightness(1, 500),
    param.tdObjects.illumination.intensity(1, 500),
  )).chain(delay(500));
}
