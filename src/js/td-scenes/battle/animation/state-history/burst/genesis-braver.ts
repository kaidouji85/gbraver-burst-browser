import { BatteryLimitBreak, Burst } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { HUDArmdozerObjects } from "../../../view/hud/armdozer-objects/hud-armdozer-ibjects";
import { GenesisBraverTD } from "../../../view/td/armdozer-objects/genesis-braver";
import { dolly, toInitial, track } from "../../td-camera";
import { BurstAnimationParamX } from "./animation-param";

/**
 * ジェネシスブレイバー バーストアニメーションパラメータ
 *
 * @template BURST バースト
 */
export type GenesisBraverBurst<BURST extends Burst> = BurstAnimationParamX<
  GenesisBraverTD,
  HUDArmdozerObjects,
  BURST
>;

/**
 * ジェネシスブレイバー バーストアニネーション
 * @param param パラメータ
 * @return アニメーション
 */
export function genesisBraverBurst(param: GenesisBraverBurst<Burst>): Animate {
  if (param.burst.type === "BatteryLimitBreak") {
    const burst: BatteryLimitBreak = param.burst;
    return batteryLimitBreak({ ...param, burst });
  }

  return empty();
}

function batteryLimitBreak(
  param: GenesisBraverBurst<BatteryLimitBreak>
): Animate {
  return all(
    param.isActive
      ? param.burstArmdozerTD.genesisBraver.endActive()
      : param.anotherArmdozerTD.sprite().endActive(),
    track(
      param.tdCamera,
      param.burstArmdozerTD.genesisBraver.getObject3D().position.x,
      500
    ),
    dolly(param.tdCamera, "-60", 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.tdObjects.turnIndicator.invisible()
  )
    .chain(delay(800))
    .chain(
      all(
        param.burstPlayerHUD.gauge.battery(
          param.burstPlayerState.armdozer.battery
        ),
        param.burstPlayerHUD.gauge.maxBattery(param.burst.maxBattery),
        param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
      )
    )
    .chain(
      all(
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500)
      )
    )
    .chain(delay(200));
}
