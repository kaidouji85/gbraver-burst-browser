// @flow

import {Animate} from "../../../../../../animation/animate";
import {LightningDozer} from "../../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";

/**
 * ライトニングドーザ  勝利
 *
 * @param sprite スプライト
 * @return アニメーション
 */
export function lightningDozerWin(sprite: LightningDozer): Animate {
  return sprite.guts();
}