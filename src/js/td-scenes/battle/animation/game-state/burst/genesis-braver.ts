import { BatteryLimitBreak, Burst } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { GenesisBraverHUD } from "../../../view/hud/armdozer-objects/genesis-braver";
import { GenesisBraverTD } from "../../../view/td/armdozer-objects/genesis-braver";
import { toInitial } from "../../td-camera";
import { BurstAnimationParamX } from "./animation-param";

/**
 * ジェネシスブレイバー バーストアニメーションパラメータ
 * @template BURST バースト
 */
export type GenesisBraverBurst<BURST extends Burst> = BurstAnimationParamX<
  GenesisBraverTD,
  GenesisBraverHUD,
  BURST
>;

/**
 * バースト発動側プレイヤーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToBurstPlayer(param: GenesisBraverBurst<Burst>) {
  const duration = 500;
  const x = param.burstArmdozerTD.genesisBraver.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * ジェネシスブレイバー バッテリーリミットブレイク アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function batteryLimitBreak(
  param: GenesisBraverBurst<BatteryLimitBreak>,
): Animate {
  return all(
    param.burstArmdozerHUD.cutIn.show(),
    param.burstArmdozerTD.genesisBraver.burst(),
    focusToBurstPlayer(param),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.attackerArmdozerTD.sprite().endActive(),
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
        param.burstPlayerHUD.gauge.maxBattery(param.burst.maxBattery),
        param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery),
      ),
    )
    .chain(
      all(
        param.burstArmdozerTD.genesisBraver.burstToStand(),
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500),
      ),
    )
    .chain(delay(200));
}

/**
 * ジェネシスブレイバー バースト アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function genesisBraverBurst(param: GenesisBraverBurst<Burst>): Animate {
  const { burst } = param;
  let ret = empty();
  if (burst.type === "BatteryLimitBreak") {
    ret = batteryLimitBreak({ ...param, burst });
  }

  return ret;
}
