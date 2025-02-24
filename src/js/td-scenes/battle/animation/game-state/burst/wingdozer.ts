import { Burst, ContinuousAttack } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { WingDozerHUD } from "../../../view/hud/armdozer-objects/wing-dozer";
import { WingDozerTD } from "../../../view/td/armdozer-objects/wing-dozer";
import { toInitial } from "../../td-camera";
import { BurstAnimationParamX } from "./animation-param";

/**
 * ウィングドーザ バーストアニメーション パラメータ
 * @template BURST バースト
 */
export type WingDozerBurst<BURST extends Burst> = BurstAnimationParamX<
  WingDozerTD,
  WingDozerHUD,
  BURST
>;

/**
 * バースト発動側プレイヤーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToBurstPlayer(param: WingDozerBurst<Burst>): Animate {
  const duration = 500;
  const x = param.burstArmdozerTD.wingDozer.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * ウィングドーザ 連続攻撃
 * @param param パラメータ
 * @returns アニメーション
 */
export function wingDozerContinuousAttack(
  param: WingDozerBurst<ContinuousAttack>,
): Animate {
  return all(
    param.burstArmdozerTD.wingDozer.dash(),
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

/**
 * ウィングドーザ バースト アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function wingDozerBurst(param: WingDozerBurst<Burst>): Animate {
  const { burst } = param;
  let ret = empty();
  if (burst.type === "ContinuousAttack") {
    ret = wingDozerContinuousAttack({ ...param, burst });
  }

  return ret;
}
