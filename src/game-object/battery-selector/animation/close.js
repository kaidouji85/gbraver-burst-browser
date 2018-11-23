// @flow

import type {BatterySelectorModel} from "../model/battery-selector";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {process} from "../../../animation/process";

/** 閉じるアニメーション */
export function close(model: BatterySelectorModel): Animate {
  return process(() => {
    model.disabled = true;
  }).chain(tween(model, t => t
      .to({opacity: 0}, 300)
  ));
}