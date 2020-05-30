// @flow

import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import type {BatterySelectorModel} from "../model";

/**
 * バッテリー決定アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function decide(model: BatterySelectorModel): Animate {
  return tween(model, t => t.to({scale: 1.1}, 100))
    .chain(tween(model, t => t.to({scale: 1}, 100)))
}