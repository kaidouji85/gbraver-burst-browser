// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import {createEmptyTween} from "../../../tween/empty-tween";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";

/** OKボタンを押す */
export function pushOkButton(model: BatterySelectorModel, group: Group): MultiTween {

  const start = new Tween({}, group)
    .onStart(() => {
      model.disabled = true;
      model.okButton.depth = 0;
    })
    .to({}, 0);

  const push = new Tween(model.okButton, group)
    .to({depth: 1}, 100)
    .repeat(1)
    .yoyo(true);
  start.chain(push);

  const end = new Tween({}, group)
    .to({}, 0)
    .onComplete(() => {
      model.disabled = false;
    });
  push.chain(end);

  const endBuffer = createEmptyTween();
  end.chain(endBuffer);

  return {
    start: start,
    end: endBuffer
  };
}