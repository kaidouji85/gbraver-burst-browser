// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import {TweenAnimation} from "../../../animation/tween-animation";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

/** OKボタンを押す */
export function pushOkButton(model: BatterySelectorModel, group: Group): TweenAnimation {
  return process(() => {
    model.disabled = true;
  }, group).chain(tween(new Tween(model.okButton, group)
    .to({depth: 1}, 100)
    .repeat(1)
    .yoyo(true)
  ));
}