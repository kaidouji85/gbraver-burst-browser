import type { Burst, LightningBarrier } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { LightningDozerHUD } from "../../../view/hud/armdozer-objects/lightning-dozer";
import { LightningDozerTD } from "../../../view/td/armdozer-objects/lightning-dozer";
import { dolly, toInitial, track } from "../../td-camera";
import type { BurstAnimationParamX } from "./animation-param";

/**
 * ライトニングドーザ バーストアニメーションパラメータ
 *
 * @template BURST バースト
 */
export type LightningDozerBurst<BURST extends Burst> = BurstAnimationParamX<
  LightningDozerTD,
  LightningDozerHUD,
  BURST
>;

/**
 * ライトニングドーザ バーストアニメーション
 *
 * @param param パラメータ
 * @returns アニメーション
 */
export function lightningDozerBurst(
  param: LightningDozerBurst<Burst>,
): Animate {
  if (param.burst.type === "LightningBarrier") {
    const burst: LightningBarrier = param.burst;
    return lightningBarrier({ ...param, burst });
  }

  return empty();
}

/**
 * 電撃バリア
 *
 * @param param パラメータ
 * @returns アニメーション
 */
function lightningBarrier(
  param: LightningDozerBurst<LightningBarrier>,
): Animate {
  return all(
    param.burstArmdozerTD.lightningDozer.guts(),
    param.burstArmdozerHUD.cutIn.show(),
    track(
      param.tdCamera,
      param.burstArmdozerTD.lightningDozer.getObject3D().position.x,
      500,
    ),
    dolly(param.tdCamera, "-60", 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.activeArmdozerTD.sprite().endActive(),
  )
    .chain(delay(800))
    .chain(
      all(
        param.burstArmdozerHUD.cutIn.hidden(),
        param.hudObjects.rearmostFader.opacity(0, 300),
      ),
    )
    .chain(delay(300))
    .chain(
      all(
        param.burstArmdozerTD.lightningBarrier.show(),
        param.burstPlayerTD.armdozerEffects.reflect.popUp(),
      ),
    )
    .chain(delay(200))
    .chain(
      all(
        param.burstPlayerHUD.gauge.battery(
          param.burstPlayerState.armdozer.battery,
        ),
        param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery),
      ),
    )
    .chain(
      all(
        toInitial(param.tdCamera, 500),
        param.burstArmdozerTD.lightningDozer.gutsToStand(),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500),
      ),
    )
    .chain(delay(200));
}
