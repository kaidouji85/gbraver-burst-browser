// @flow

import {Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

/** OKボタンを押す */
export function pushOkButton(model: BatterySelectorModel): Animate {
  return process(() => {
    model.disabled = true;
  }).chain(
    tween(new Tween(model.okButton)
      .to({depth: 1}, 100)
      .repeat(1)
      .yoyo(true)
    )
  );
}