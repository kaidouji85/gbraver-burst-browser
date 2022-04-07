// @flow
import type {Burst, ContinuousAttack} from "gbraver-burst-core";
import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {dolly, toInitial, track} from "../../td-camera";
import {WingDozerHUD} from "../../../view/hud/armdozer-objects/wing-dozer";
import {WingDozerTD} from "../../../view/td/armdozer-objects/wing-dozer";

/**
 * ウィングドーザ バーストアニメーション パラメータ
 *
 * @template BURST バースト
 */
export type WingDozerBurst<BURST> = BurstAnimationParamX<WingDozerTD, WingDozerHUD, BURST>;

/**
 * ウィングドーザバーストアニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castWingDozerBurst(origin: BurstAnimationParam): ?WingDozerBurst<Burst> {
  if (!(origin.burstArmdozerTD instanceof WingDozerTD) || !(origin.burstArmdozerHUD instanceof WingDozerHUD)) {
    return null;
  }

  const tdArmdozer: WingDozerTD = origin.burstArmdozerTD;
  const hudArmdozer: WingDozerHUD = origin.burstArmdozerHUD;
  return ((origin: any): BurstAnimationParamX<typeof tdArmdozer, typeof hudArmdozer, Burst>);
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
    param.burstArmdozerTD.wingDozer.dash(),
    param.burstArmdozerHUD.cutIn.show(),
    track(param.tdCamera, param.burstArmdozerTD.wingDozer.getObject3D().position.x, 500),
    dolly(param.tdCamera, '-60', 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(1000))
    .chain(all(
      param.burstArmdozerHUD.cutIn.hidden(),
      param.hudObjects.rearmostFader.opacity(0, 300),))
    .chain(delay(300))
    .chain(param.burstPlayerTD.armdozerEffects.continuousAttack.popUp())
    .chain(delay(200))
    .chain(all(
      param.burstPlayerHUD.gauge.battery(param.burstPlayerState.armdozer.battery),
      param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
    ))
    .chain(all(
      param.burstArmdozerTD.wingDozer.dashToStand(),
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ));
}
