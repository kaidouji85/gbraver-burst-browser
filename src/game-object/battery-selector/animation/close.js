// @flow

import type {BatterySelectorModel} from "../model/battery-selector";
import {Tween} from '@tweenjs/tween.js';
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {process} from "../../../animation/process";

/** 閉じるアニメーション */
export function close(model: BatterySelectorModel): Animate {
  return process(() => {
    model.disabled = true;
  }).chain(tween(new Tween(model)
      .to({opacity: 0}, 300)
  ));
}