// @flow

import type {AttackerIndicatorModel} from "../model/attacker-indicator-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/**
 * 消す
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: AttackerIndicatorModel): Animate {
  return tween(model, t=>t
    .to({opacity: 1}, 300)
  );
}