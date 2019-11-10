// @flow

import type {TurnStartModel} from "../model/turn-start-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/**
 * 消す
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: TurnStartModel): Animate {
  return tween(model, t=>t
    .to({opacity: 1}, 300)
  );
}