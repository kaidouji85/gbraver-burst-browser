// @flow

import {WingDozer} from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import type {Burst} from "gbraver-burst-core";
import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
// TODO gbraver-burst-coreから直接インポートする
import type {ContinuousAttack} from "gbraver-burst-core/lib/player/burst";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";

/**
 * ウィングドーザ バーストアニメーション パラメータ
 *
 * @type BURST バースト
 */
export type WingDozerBurst<BURST> = BurstAnimationParamX<WingDozer, any, any, BURST>;

/**
 * ウィングドーザバーストアニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castWingDozerBurst(origin: BurstAnimationParam): ?WingDozerBurst<Burst> {
  if (!(origin.burstSprite instanceof WingDozer)) {
    return null;
  }

  const sprite: WingDozer = origin.burstSprite;
  return ((origin: any): BurstAnimationParamX<typeof sprite, any, any, Burst>);
}

/**
 * ウィングドーザのバーストアニメーション
 * 
 * @param param パラメータ
 * @return アニメーション
 */
export function wingDozerBurst(param: WingDozerBurst<Burst>): Animate {
  if (param.burst.type === 'ContinuousAttack') {
    const continuousAttack: ContinuousAttack = param.burst;
    const castParam = ((param: any): WingDozerBurst<typeof continuousAttack>);
    return wingDozerContinuousAttack(castParam);
  }
  return empty();
}


/**
 * ウィングドーザ 連続攻撃
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function wingDozerContinuousAttack(param: WingDozerBurst<ContinuousAttack>): Animate {
  return  all(
    param.burstSprite.turnStart(),
    //param.burstArmdozerHUD.cutIn.show(),
    attentionArmDozer(param.tdCamera, param.burstSprite, 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(2000))
    .chain(all(
      //param.burstArmdozerHUD.cutIn.hidden(),
      param.hudObjects.rearmostFader.opacity(0, 300),))
    .chain(delay(500))
    //.chain(param.burstPlayerTD.armdozerEffects.powerUp.popUp())
    .chain(delay(500))
    .chain(all(
      param.burstPlayerHUD.gauge.battery(param.burstPlayerState.armdozer.battery),
      param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
    ))
    .chain(delay(500))
    .chain(all(
      param.burstSprite.turnStartToStand(),
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ))
    .chain(delay(500));
}
