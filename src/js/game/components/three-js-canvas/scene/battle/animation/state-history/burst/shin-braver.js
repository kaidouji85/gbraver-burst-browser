// @flow

import type {BurstAnimationParam} from "./animation-param";
import {Animate} from "../../../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../../../game-object/armdozer/shin-braver/shin-braver";
import {delay, empty} from "../../../../../../../../animation/delay";
import type {Burst, RecoverBattery} from "gbraver-burst-core/lib/armdozer/burst";
import {all} from "../../../../../../../../animation/all";
import {zoomIn} from "../../td-camera";

/**
 * シンブレイバーのバーストアニメーション
 *
 * @param param バーストアニメーションパラメータ
 * @return バーストアニメーション
 */
export function shinBraverBurst(param: BurstAnimationParam<ShinBraver, Burst>): Animate {
  if (param.burst.type === 'RecoverBattery') {
    const castBurst = (param.burst: RecoverBattery);
    const castParam = ((param: any): BurstAnimationParam<ShinBraver, typeof castBurst>);
    return recoverBattery(castParam);
  }

  return empty();
}

/**
 * バッテリー回復バースト
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
function recoverBattery(param: BurstAnimationParam<ShinBraver, RecoverBattery>): Animate {
  const playerX = param.burstPlayerTD.sprite.getObject3D().position.x;
  return all(
    zoomIn(param.tdCamera, playerX, 300),

    delay(800).chain(all(
      param.burstPlayerHUD.gauge.battery(param.burstPlayerState.armdozer.battery),
      param.burstPlayerTD.recoverBattery.popUp(param.burst.recoverBattery)
    ))
  );
}
