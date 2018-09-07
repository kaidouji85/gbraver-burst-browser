// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import {createEmptyTweenByGroup} from "../../../tween/empty-tween";
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

  const close = new Tween(model, group)
    .to({opacity: 0}, 300)
  push.chain(close);

  const end = new Tween({}, group)
    .to({}, 0)
    .onComplete(() => {
      model.disabled = false;
    });
  close.chain(end);

  const endBuffer = createEmptyTweenByGroup(group);
  end.chain(endBuffer);

  return {
    start: start,
    end: endBuffer
  };
}