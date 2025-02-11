import { Burst, LightningBarrier } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { LightningDozerHUD } from "../../../view/hud/armdozer-objects/lightning-dozer";
import { LightningDozerTD } from "../../../view/td/armdozer-objects/lightning-dozer";
import { toInitial } from "../../td-camera";
import { BurstAnimationParamX } from "./animation-param";

/**
 * ライトニングドーザ バースト アニメーションパラメータ
 * @template BURST バースト
 */
export type LightningDozerBurst<BURST extends Burst> = BurstAnimationParamX<
  LightningDozerTD,
  LightningDozerHUD,
  BURST
>;

/**
 * バースト発動側プレイヤーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToBurstPlayer(param: LightningDozerBurst<Burst>) {
  const duration = 500;
  const x = param.burstArmdozerTD.lightningDozer.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * ライトニングドーザ 電撃バリア アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function lightningBarrier(
  param: LightningDozerBurst<LightningBarrier>,
): Animate {
  return all(
    param.burstArmdozerTD.lightningDozer.guts(),
    param.burstArmdozerHUD.cutIn.show(),
    focusToBurstPlayer(param),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.attackerArmdozerTD.sprite().endActive(),
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

/**
 * ライトニングドーザ バーストアニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function lightningDozerBurst(
  param: LightningDozerBurst<Burst>,
): Animate {
  const { burst } = param;
  let ret = empty();
  if (burst.type === "LightningBarrier") {
    ret = lightningBarrier({ ...param, burst });
  }

  return ret;
}
