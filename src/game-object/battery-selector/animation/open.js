// @flow

import type {BatterySelectorModel} from "../model/battery-selector";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Group, Tween} from '@tweenjs/tween.js';
import type {OkButtonLabel} from "../model/ok-button";
import {createEmptyTweenByGroup} from "../../../tween/empty-tween";

type Param = {
  model: BatterySelectorModel,
  group: Group,
  initialValue: number,
  maxEnable: number,
  okButtonLabel: OkButtonLabel,
  onStart: () => void,
};

/**バッテリーセレクタを開く */
export function open(param: Param): MultiTween {
  const startBuffer = createEmptyTweenByGroup(param.group);
  const openTween = new Tween(param.model, param.group)
    .onStart(() => {
      param.model.disabled = true;
      param.model.opacity = 0;
      param.model.slider.enableMax = param.maxEnable;
      param.model.slider.battery = param.initialValue;
      param.model.okButton.label = param.okButtonLabel;
      param.onStart();
    })
    .to({opacity: 1}, 300)
    .onComplete(() => {
      param.model.disabled = false;
    });
  const endBuffer = createEmptyTweenByGroup(param.group);

  startBuffer.chain(openTween);
  openTween.chain(endBuffer);

  return {
    start: startBuffer,
    end: endBuffer
  }
}