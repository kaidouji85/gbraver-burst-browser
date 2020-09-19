// @flow

import {Animate} from "../../../../../../animation/animate";
import {NeoLandozer} from "../../../../../../game-object/armdozer/neo-landozer/neo-landozer";

/**
 * ネオランドーザ 勝利
 * 
 * @param sprite スプライト
 * @return アニメーション
 */
export function neoLandozerWin(sprite: NeoLandozer): Animate {
  return sprite.guts();
}