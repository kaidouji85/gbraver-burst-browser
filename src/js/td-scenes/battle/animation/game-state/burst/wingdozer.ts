import type { Burst, ContinuousAttack } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { WingDozerHUD } from "../../../view/hud/armdozer-objects/wing-dozer";
import { WingDozerTD } from "../../../view/td/armdozer-objects/wing-dozer";
import { dolly, toInitial, track } from "../../td-camera";
import type { BurstAnimationParamX } from "./animation-param";

/**
 * ウィングドーザ バーストアニメーション パラメータ
 *
 * @template BURST バースト
 */
export type WingDozerBurst<BURST extends Burst> = BurstAnimationParamX<
  WingDozerTD,
  WingDozerHUD,
  BURST
>;

/**
 * ウィングドーザのバーストアニメーション
 *
 * @param param パラメータ
 * @returns アニメーション
 */
export function wingDozerBurst(param: WingDozerBurst<Burst>): Animate {
  if (param.burst.type === "ContinuousAttack") {
    const burst: ContinuousAttack = param.burst;
    return wingDozerContinuousAttack({ ...param, burst });
  }

  return empty();
}

/**
 * ウィングドーザ 連続攻撃
 *
 * @param param パラメータ
 * @returns アニメーション
 */
export function wingDozerContinuousAttack(
  param: WingDozerBurst<ContinuousAttack>,
): Animate {
  return all(
    param.burstArmdozerTD.wingDozer.dash(),
    param.burstArmdozerHUD.cutIn.show(),
    track(
      param.tdCamera,
      param.burstArmdozerTD.wingDozer.getObject3D().position.x,
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
    .chain(param.burstPlayerTD.armdozerEffects.continuousAttack.popUp())
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
        param.burstArmdozerTD.wingDozer.dashToStand(),
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500),
      ),
    )
    .chain(delay(200));
}
