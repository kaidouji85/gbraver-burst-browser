// @flow
import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {Animate} from "../../../../../../animation/animate";
import {delay, empty} from "../../../../../../animation/delay";
import type {Burst, RecoverBattery} from "gbraver-burst-core";
import {all} from "../../../../../../animation/all";
import {dolly, toInitial, track} from "../../td-camera";
import {ShinBraverHUD} from "../../../view/hud/armdozer-objects/shin-braver";
import {ShinBraverTD} from "../../../view/td/armdozer-objects/shin-braver";

/**
 * シンブレイバー バーストアニメーション パラメータ
 * @template BURST バースト種別
 */
export type ShinBraverBurst<BURST> = BurstAnimationParamX<ShinBraverTD, ShinBraverHUD, BURST>;

/**
 * シンブレイバーバーストアニメーションパラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param param キャスト元
 * @return キャスト結果
 */
export function castShinBraverBurst(param: BurstAnimationParam): ?ShinBraverBurst<Burst> {
  if ((param.burstArmdozerTD instanceof ShinBraverTD) && (param.burstArmdozerHUD instanceof ShinBraverHUD)) {
    const tdArmdozer: ShinBraverTD = param.burstArmdozerTD;
    const hudArmdozer: ShinBraverHUD = param.burstArmdozerHUD;
    return ((param: any): BurstAnimationParamX<typeof tdArmdozer, typeof hudArmdozer, typeof param.burst>);
  }

  return null;
}

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: ShinBraverBurst<Burst>): Animate {
  if (param.burst.type === 'RecoverBattery') {
    const castBurst: RecoverBattery = param.burst;
    const castParam = ((param: any): ShinBraverBurst<typeof castBurst>);
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
function recoverBattery(param: ShinBraverBurst<RecoverBattery>): Animate {
  return all(
    param.burstArmdozerHUD.cutIn.show(),
    param.burstArmdozerTD.shinBraver.burst(),
    track(param.tdCamera, param.burstArmdozerTD.shinBraver.getObject3D().position.x, 500),
    dolly(param.tdCamera, '-60', 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.tdObjects.turnIndicator.invisible(),
  )
    .chain(delay(1000))
    .chain(all(
      param.hudObjects.rearmostFader.opacity(0, 300),
      param.burstArmdozerHUD.cutIn.hidden(),
    ))
    .chain(delay(300))
    .chain(all(
      param.burstPlayerHUD.gauge.battery(param.burstPlayerState.armdozer.battery),
      param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
    ))
    .chain(delay(200))
    .chain(
      delay(500),
      param.burstArmdozerTD.shinBraver.burstToStand(),
      toInitial(param.tdCamera, 500),
      param.tdObjects.skyBrightness.brightness(1, 500),
      param.tdObjects.illumination.intensity(1, 500),
    );
}
