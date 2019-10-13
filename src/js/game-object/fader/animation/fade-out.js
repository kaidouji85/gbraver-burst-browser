// @flow

import {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";
import type {FaderModel} from "../model/fader-model";

/**
 * フェードアウト
 *
 * @param model モデル
 * @return アニメーション
 */
export function fadeOut(model: FaderModel): Animate {
  return process(() => {
    model.opacity = 1;
  }).chain(tween(model, t => t
    .to({opacity: 0}, 500)
  ));
}