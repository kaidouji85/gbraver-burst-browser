// @flow

import type {BurstAnimationParam, BurstAnimationParamX} from "./animation-param";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {NeoLandozerHUD} from "../../../view/hud/armdozer/neo-landozer";
import type {TDArmdozer} from "../../../view/td/armdozer";
import type {Burst} from "gbraver-burst-core";

/**
 * ネオランドーザ バーストアニメーション パラメータ
 *
 * @type BURST バースト
 */
type NeoLandozerBurstAnimationParam<BURST> = BurstAnimationParamX<NeoLandozer, NeoLandozerHUD, TDArmdozer, BURST>;

/**
 * ネオランドーザ バーストアニメーション パラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param param 変換元
 * @return 変換結果
 */
export function toNeoLandozerBurstAnimationParam(param: BurstAnimationParam): ?NeoLandozerBurstAnimationParam<Burst> {
  if ((param.burstSprite instanceof NeoLandozer) && (param.burstArmdozerHUD instanceof NeoLandozerHUD)) {
    const sprite = (param.burstSprite: NeoLandozer);
    const armdozerHUD = (param.burstArmdozerHUD: NeoLandozerHUD);
    return ((param: any): BurstAnimationParamX<typeof sprite, typeof armdozerHUD, typeof param.burstArmdozerTD, typeof param.burst>);
  }

  return null;
}