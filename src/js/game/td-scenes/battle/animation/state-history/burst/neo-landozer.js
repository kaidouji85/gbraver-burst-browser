// @flow
import type {BuffPower, Burst} from "gbraver-burst-core";
import {all} from "../../../../../../animation/all";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {NeoLandozerHUD} from "../../../view/hud/armdozer-objects/neo-landozer";
import {NeoLandozerTD} from "../../../view/td/armdozer-objects/neo-landozer";
import {dolly, toInitial, track} from "../../td-camera";
import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";

/**
 * ネオランドーザ バーストアニメーション パラメータ
 *
 * @template BURST バースト
 */
type NeoLandozerBurst<BURST> = BurstAnimationParamX<NeoLandozerTD, NeoLandozerHUD, BURST>;

/**
 * ネオランドーザ バーストアニメーション パラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param param キャスト元
 * @return キャスト結果
 */
export function castNeoLandozerBurst(param: BurstAnimationParam): ?NeoLandozerBurst<Burst> {
  if ((param.burstArmdozerTD instanceof NeoLandozerTD) && (param.burstArmdozerHUD instanceof NeoLandozerHUD)) {
    const armdozerTD = (param.burstArmdozerTD: NeoLandozerTD);
    const armdozerHUD = (param.burstArmdozerHUD: NeoLandozerHUD);
    return ((param: any): BurstAnimationParamX<typeof armdozerTD, typeof armdozerHUD, typeof param.burst>);
  }

  return null;
}

/**
 * ネオランドーザ バースト アニメーション
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function neoLandozerBurst(param: NeoLandozerBurst<Burst>): Animate {
  if (param.burst.type === 'BuffPower') {
    const buffPower = (param.burst: BuffPower);
    const castParam = ((param: any): NeoLandozerBurst<typeof buffPower>);
    return neoLandozerBuffPower(castParam);
  }
  return empty();
}

/**
 * ネオランドーザ バフパワー
 *
 * @param param パラメータ
 * @return アニメーション
 */
function neoLandozerBuffPower(param: NeoLandozerBurst<BuffPower>): Animate {
  return  all(
    param.burstArmdozerTD.neoLandozer.guts(),
    param.burstArmdozerHUD.cutIn.show(),
    track(param.tdCamera, param.burstArmdozerTD.neoLandozer.getObject3D().position.x, 500),
    dolly(param.tdCamera, '-60', 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(800))
    .chain(all(
      param.burstArmdozerHUD.cutIn.hidden(),
      param.hudObjects.rearmostFader.opacity(0, 300)
    ))
    .chain(delay(300))
    .chain(param.burstPlayerTD.armdozerEffects.powerUp.popUp())
    .chain(delay(200))
    .chain(all(
      param.burstPlayerHUD.gauge.battery(param.burstPlayerState.armdozer.battery),
      param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
    ))
    .chain(all(
      param.burstArmdozerTD.neoLandozer.gutsToStand(),
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    ))
    .chain(delay(200));
}
