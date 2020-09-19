// @flow

import {WingDozer} from "../../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {Animate} from "../../../../../../animation/animate";

/**
 * ウィングドーザ 勝利
 *
 * @param sprite スプライト
 * @return アニメーション
 */
export function wingDozerWin(sprite: WingDozer): Animate {
  return sprite.dash();
}