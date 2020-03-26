// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {BattleAnimationParamX} from "../animation-param";
import {LightningDozer} from "../../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {empty} from "../../../../../../../animation/delay";
import type {BattleResult} from "gbraver-burst-core";

/**
 * ライトニングドーザ 戦闘アニメーション
 *
 * @param param パラメーター
 * @return アニメーション
 */
export function lightningDozerAttack(param: BattleAnimationParamX<LightningDozer, BattleResult>): Animate {
  return empty();
}