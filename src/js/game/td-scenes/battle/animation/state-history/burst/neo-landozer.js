// @flow

import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {NeoLandozerHUD} from "../../../view/hud/armdozer-objects/neo-landozer";
import type {BuffPower, Burst} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";
import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";

/**
 * ネオランドーザ バーストアニメーション パラメータ
 *
 * @type BURST バースト
 */
type NeoLandozerBurst<BURST> = BurstAnimationParamX<NeoLandozer, NeoLandozerHUD, TDArmdozerObjects, BURST>;

/**
 * ネオランドーザ バーストアニメーション パラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param param キャスト元
 * @return キャスト結果
 */
export function castNeoLandozerBurst(param: BurstAnimationParam): ?NeoLandozerBurst<Burst> {
  if ((param.burstSprite instanceof NeoLandozer) && (param.burstArmdozerHUD instanceof NeoLandozerHUD)) {
    const sprite = (param.burstSprite: NeoLandozer);
    const armdozerHUD = (param.burstArmdozerHUD: NeoLandozerHUD);
    return ((param: any): BurstAnimationParamX<typeof sprite, typeof armdozerHUD, typeof param.burstArmdozerTD, typeof param.burst>);
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
    param.burstSprite.turnStart(),
    param.burstArmdozerHUD.cutIn.show(),
    attentionArmDozer(param.tdCamera, param.burstSprite, 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.tdObjects.turnIndicator.invisible(),
  ).chain(delay(2000)
  ).chain(all(
    param.burstArmdozerHUD.cutIn.hidden(),
    param.hudObjects.rearmostFader.opacity(0, 300),
  )).chain(delay(500)
  ).chain(param.burstPlayerTD.armdozerEffects.powerUp.popUp()
  ).chain(delay(500)
  ).chain(all(
    param.burstPlayerHUD.gauge.battery(param.burstPlayerState.armdozer.battery),
    param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
  )).chain(delay(500)
  ).chain(all(
    param.burstSprite.turnStartToStand(),
    toInitial(param.tdCamera, 500),
    param.tdObjects.skyBrightness.brightness(1, 500),
    param.tdObjects.illumination.intensity(1, 500),
  )).chain(delay(500));
}
