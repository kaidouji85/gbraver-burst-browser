import { Burst, EffectClear } from "gbraver-burst-core";

import { all } from "../../../../../animation/all";
import { Animate } from "../../../../../animation/animate";
import { delay, empty } from "../../../../../animation/delay";
import { GranDozerHUD } from "../../../view/hud/armdozer-objects/gran-dozer";
import { GranDozerTD } from "../../../view/td/armdozer-objects/gran-dozer";
import { toInitial } from "../../td-camera";
import { BurstAnimationParamX } from "./animation-param";

/**
 * グランドーザ バーストアニメーション パラメータ
 * @template BURST バースト種別
 */
export type GranDozerBurst<BURST extends Burst> = BurstAnimationParamX<
  GranDozerTD,
  GranDozerHUD,
  BURST
>;

/**
 * バースト発動側プレイヤーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToBurstPlayer(param: GranDozerBurst<Burst>) {
  const duration = 500;
  const x = param.burstArmdozerTD.granDozer.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * グランドーザ 効果クリア アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
function effectClear(param: GranDozerBurst<EffectClear>): Animate {
  return all(
    focusToBurstPlayer(param),
    param.burstArmdozerHUD.cutIn.show(),
    param.burstArmdozerTD.granDozer.burst(),
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
    .chain(delay(100))
    .chain(
      all(
        toInitial(param.tdCamera, 300),
        param.burstArmdozerTD.lightningShot.shot(),
        param.otherArmdozerTD.sprite().knockBack(),
        param.otherPlayerTD.armdozerEffects.ineffective
          .show()
          .chain(delay(800))
          .chain(param.otherPlayerTD.armdozerEffects.ineffective.hidden()),
      ),
    )
    .chain(delay(100))
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
        param.burstArmdozerTD.granDozer.burstToStand(),
        param.otherArmdozerTD.sprite().knockBackToStand(),
        param.tdObjects.skyBrightness.brightness(1, 500),
        param.tdObjects.illumination.intensity(1, 500),
      ),
    )
    .chain(delay(200));
}

/**
 * グランドーザ バースト アニメーション
 * @param param パラメータ
 * @returns アニメーション
 */
export function granDozerBurst(param: GranDozerBurst<Burst>): Animate {
  const { burst } = param;
  let ret = empty();
  if (burst.type === "EffectClear") {
    ret = effectClear({ ...param, burst });
  }

  return ret;
}
