import { BuffPower, Burst } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { NeoLandozerHUD } from "../../../view/hud/armdozer-objects/neo-landozer";
import { NeoLandozerTD } from "../../../view/td/armdozer-objects/neo-landozer";
import { dolly, toInitial, track } from "../../td-camera";
import { BurstAnimationParamX } from "./animation-param";

/**
 * ネオランドーザ バーストアニメーション パラメータ
 * @template BURST バースト
 */
type NeoLandozerBurst<BURST extends Burst> = BurstAnimationParamX<
  NeoLandozerTD,
  NeoLandozerHUD,
  BURST
>;

/**
 * ネオランドーザ バフパワー アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function neoLandozerBuffPower(param: NeoLandozerBurst<BuffPower>): Animate {
  return all(
    param.burstArmdozerTD.neoLandozer.guts(),
    param.burstArmdozerHUD.cutIn.show(),
    track(
      param.tdCamera,
      param.burstArmdozerTD.neoLandozer.getObject3D().position.x,
      500,
    ),
    dolly(param.tdCamera, "-60", 500),
    param.tdObjects.skyBrightness.brightness(0.2, 500),
    param.tdObjects.illumination.intensity(0.2, 500),
    param.hudObjects.rearmostFader.opacity(0.6, 500),
    param.attackerArmdozerTD.sprite().endActive(),
    param.defenderHUD.predicatedDamage.hidden(),
  )
    .chain(delay(800))
    .chain(
      all(
        param.burstArmdozerHUD.cutIn.hidden(),
        param.hudObjects.rearmostFader.opacity(0, 300),
      ),
    )
    .chain(delay(300))
    .chain(param.burstPlayerTD.armdozerEffects.powerUp.popUp())
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
        param.burstArmdozerTD.neoLandozer.gutsToStand(),
        toInitial(param.tdCamera, 500),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500),
      ),
    )
    .chain(delay(200));
}

/**
 * ネオランドーザ バースト アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function neoLandozerBurst(param: NeoLandozerBurst<Burst>): Animate {
  if (param.burst.type === "BuffPower") {
    const burst: BuffPower = param.burst;
    return neoLandozerBuffPower({ ...param, burst });
  }

  return empty();
}
