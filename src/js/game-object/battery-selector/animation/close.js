// @flow

import type {BatterySelectorModel} from "../model";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";
import {Animate} from "../../../animation/animate";

/** バッテリーセレクタを閉じる */
export function close(model: BatterySelectorModel): Animate {
  return process(() => {
    model.disabled = true;
    model.opacity = 1;
    model.scale = 1;
  }).chain(tween(model, t => t
    .to({opacity: 0, scale: 0.98}, 200)
  ));
}