import type { Burst, RecoverBattery } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { ShinBraverHUD } from "../../../view/hud/armdozer-objects/shin-braver";
import { ShinBraverTD } from "../../../view/td/armdozer-objects/shin-braver";
import { dolly, toInitial, track } from "../../td-camera";
import type { BurstAnimationParamX } from "./animation-param";

/**
 * シンブレイバー バーストアニメーション パラメータ
 * @template BURST バースト種別
 */
export type ShinBraverBurst<BURST extends Burst> = BurstAnimationParamX<
  ShinBraverTD,
  ShinBraverHUD,
  BURST
>;

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: ShinBraverBurst<Burst>): Animate {
  if (param.burst.type === "RecoverBattery") {
    const burst: RecoverBattery = param.burst;
    return recoverBattery({ ...param, burst });
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
    track(
      param.tdCamera,
      param.burstArmdozerTD.shinBraver.getObject3D().position.x,
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
        param.hudObjects.rearmostFader.opacity(0, 300),
        param.burstArmdozerHUD.cutIn.hidden(),
      ),
    )
    .chain(delay(300))
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
        param.burstArmdozerTD.shinBraver.burstToStand(),
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500),
      ),
    )
    .chain(delay(200));
}
