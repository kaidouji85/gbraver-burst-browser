// @flow

import {Animate} from "../../../animation/animate";
import type {TurnStartModel} from "../model/turn-start-model";
import {tween} from "../../../animation/tween";

/**
 * 非表示アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: TurnStartModel): Animate {
  return tween(model, t => t.to({opacity: 0}, 400));
}
