// @flow

import {Animate} from "../../../../../../animation/animate";
import {ShinBraver} from "../../../../../../game-object/armdozer/shin-braver/shin-braver";

/**
 * シンブレイバー 勝利
 *
 * @param sprite スプライト
 * @return アニメーション
 */
export function shinBraverWin(sprite: ShinBraver): Animate {
  return sprite.guts();
}