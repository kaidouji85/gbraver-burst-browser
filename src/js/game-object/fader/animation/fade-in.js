// @flow

import type {FaderModel} from "../model/fader-model";
import {Animate} from "../../../animation/animate";
import {process} from '../../../animation/process';
import {tween} from "../../../animation/tween";

/**
 * フェードイン
 *
 * @param model モデル
 * @return アニメーションanime-syonn
 */
export function fadeIn(model: FaderModel): Animate {
  return process(() => {
    model.opacity = 1;
  }).chain(tween(model, t => t
    .to({opacity: 0}, 500)
  ));
}