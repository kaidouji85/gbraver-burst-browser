// @flow

import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {delay, empty} from "../../../../../../animation/delay";
import type {Burst, RecoverBattery} from "gbraver-burst-core";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer, toInitial} from "../../td-camera";
import {ShinBraverHUD} from "../../../view/hud/armdozer/shin-braver";
import {EmptyTDArmdozer} from "../../../view/td/armdozer/empty";

/**
 * シンブレイバー バーストアニメーション パラメータ
 * @type BURST バースト種別
 */
export type ShinBraverBurstAnimationParam<BURST> = BurstAnimationParamX<ShinBraver, ShinBraverHUD, EmptyTDArmdozer, Burst>;

/**
 * シンブレイバーバーストアニメーションパラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param param 変換元
 * @return 変換結果
 */
export function toShinBraverBurstParam(param: BurstAnimationParam): ?ShinBraverBurstAnimationParam<Burst> {
  if ((param.burstSprite instanceof ShinBraver) && param.burstArmdozerHUD instanceof ShinBraverHUD) {
    return ((param: any): ShinBraverBurstAnimationParam<Burst>);
  }

  return null;
}

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: ShinBraverBurstAnimationParam<Burst>): Animate {
  if (param.burst.type === 'RecoverBattery') {
    const castParam = ((param: any): ShinBraverBurstAnimationParam<RecoverBattery>);
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
function recoverBattery(param: ShinBraverBurstAnimationParam<RecoverBattery>): Animate {
  return all(
    attentionArmDozer(param.tdCamera, param.burstSprite, 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.tdObjects.turnIndicator.invisible()
  ).chain(delay(500)
  ).chain(all(
    param.hudObjects.rearmostFader.opacity(0.6, 300),
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
