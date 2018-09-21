// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";

/** OKボタンを押す */
export function pushOkButton(model: BatterySelectorModel, group: Group): MultiTween {
  const start = new Tween(model.okButton, group)
    .to({depth: 0}, 0)
    .onStart(() => {
      model.disabled = true;
    });
  const push = new Tween(model.okButton, group)
    .to({depth: 1}, 100)
    .repeat(1)
    .yoyo(true);
  const close = new Tween(model, group)
    .to({opacity: 0}, 300);

  start.chain(push);
  push.chain(close);

  return {
    start: start,
    end: close
  };
}