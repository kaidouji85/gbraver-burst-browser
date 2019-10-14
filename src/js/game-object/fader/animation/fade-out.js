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
    model.opacity = 0;
  }).chain(tween(model, t => t
    .to({opacity: 1}, 500)
  ));
}