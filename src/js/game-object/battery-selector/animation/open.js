// @flow

import {Animate} from "../../../animation/animate";
import type {BatterySelectorModel} from "../model";
import {tween} from "../../../animation/tween";
import {process} from "../../../animation/process";

/** ボタン表示アニメーション */
export function open(model: BatterySelectorModel): Animate {
  return process(() => {
    model.disabled = true;
    model.opacity = 0;
    model.scale = 0.98
  }).chain(tween(model, t => t
    .to({opacity: 1, scale: 1}, 200)
  )).chain(process(() => {
    model.disabled = false;
  }));
}