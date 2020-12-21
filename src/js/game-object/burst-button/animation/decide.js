// @flow

import {Animate} from "../../../animation/animate";
import type {BurstButtonModel} from "../model/burst-button-model";
import {tween} from "../../../animation/tween";
import {process} from '../../../animation/process';

/**
 * 決定アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function decide(model: BurstButtonModel): Animate {
  return process(() => {
    model.disabled = true;
  }).chain(tween(model, t => t.to({scale: 1.1}, 100)))
    .chain(tween(model, t => t.to({scale: 1}, 100)));
}
