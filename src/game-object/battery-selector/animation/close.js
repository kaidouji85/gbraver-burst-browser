// @flow

import type {BatterySelectorModel} from "../model/battery-selector";
import {Group, Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../animation/tween-animation";
import {tween} from "../../../animation/tween";
import {process} from "../../../animation/process";

/** 閉じるアニメーション */
export function close(model: BatterySelectorModel): TweenAnimation {
  return process(() => {
    model.disabled = true;
  }).chain(tween(new Tween(model)
      .to({opacity: 0}, 300)
  ));
}