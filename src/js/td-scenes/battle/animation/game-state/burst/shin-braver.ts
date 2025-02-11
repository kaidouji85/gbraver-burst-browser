import { Burst, RecoverBattery } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { ShinBraverHUD } from "../../../view/hud/armdozer-objects/shin-braver";
import { ShinBraverTD } from "../../../view/td/armdozer-objects/shin-braver";
import { toInitial } from "../../td-camera";
import { BurstAnimationParamX } from "./animation-param";

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
 * バースト発動側プレイヤーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToBurstPlayer(param: ShinBraverBurst<Burst>) {
  const duration = 500;
  const x = param.burstArmdozerTD.shinBraver.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * シンブレイバー バッテリー回復 アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function recoverBattery(param: ShinBraverBurst<RecoverBattery>): Animate {
  return all(
    param.burstArmdozerHUD.cutIn.show(),
    param.burstArmdozerTD.shinBraver.burst(),
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

/**
 * シンブレイバー バースト アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function shinBraverBurst(param: ShinBraverBurst<Burst>): Animate {
  const { burst } = param;
  let ret = empty();
  if (burst.type === "RecoverBattery") {
    ret = recoverBattery({ ...param, burst });
  }

  return ret;
}
