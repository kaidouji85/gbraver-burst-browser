// @flow

import type {BatterySelectorModel} from "../model/battery-selector";
import {Tween} from '@tweenjs/tween.js';
import type {OkButtonLabel} from "../model/ok-button";
import {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

type Param = {
  model: BatterySelectorModel,
  initialValue: number,
  maxEnable: number,
  okButtonLabel: OkButtonLabel,
};

/**バッテリーセレクタを開く */
export function open(param: Param): Animate {
  return process(() => {
    param.model.disabled = true;
    param.model.opacity = 0;
    param.model.slider.enableMax = param.maxEnable;
    param.model.slider.battery = param.initialValue;
    param.model.okButton.label = param.okButtonLabel;
  }).chain(
    tween(new Tween(param.model)
      .to({opacity: 1}, 300)
    )
  ).chain(
    process(() => {
      param.model.disabled = false;
    })
  );
}