// @flow

import type {BurstAnimationParamX} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {delay, empty} from "../../../../../../animation/delay";
import type {Burst, RecoverBattery} from "gbraver-burst-core";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";
import {ShinBraverHUD} from "../../../view/hud/armdozer/shin-braver";

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: BurstAnimationParamX<ShinBraver, ShinBraverHUD, Burst>): Animate {
  if (param.burst.type === 'RecoverBattery') {
    const castBurst = (param.burst: RecoverBattery);
    const castParam = ((param: any): BurstAnimationParamX<ShinBraver, ShinBraverHUD, typeof castBurst>);
    return recoverBattery(castParam);
  }

  return empty();
}

/**
 * バッテリー回復バースト
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
function recoverBattery(param: BurstAnimationParamX<ShinBraver, ShinBraverHUD, RecoverBattery>): Animate {
  return all(
    attentionArmDozer(param.tdCamera, param.burstPlayerTD.sprite, 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.tdObjects.turnIndicator.invisible()
  ).chain(delay(500)
  ).chain(all(
    param.hudObjects.rearmostFader.opacity(0.8, 300),
    param.burstArmdozerHUD.cutIn.play(),
  )).chain(delay(2000)
  ).chain(all(
    param.hudObjects.rearmostFader.opacity(0, 300),
    param.burstArmdozerHUD.cutIn.hidden(),
  )).chain(delay(500)
  ).chain(all(
    param.burstPlayerTD.gauge.battery(param.burstPlayerState.armdozer.battery),
    param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
  )).chain(delay(500)
  ).chain(all(
    toInitial(param.tdCamera, 500),
    param.tdObjects.skyBrightness.brightness(1, 500),
    param.tdObjects.illumination.intensity(1, 500),
  )).chain(delay(500));
}
