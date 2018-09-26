// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {createEmptyTweenByGroup} from "../../../tween/empty-tween";

/** OKボタンを押す */
export function pushOkButton(model: BatterySelectorModel, group: Group): MultiTween {
  const start = createEmptyTweenByGroup(group);
  const initDepth = new Tween(model.okButton, group)
    .to({depth: 0}, 0)
    .onStart(() => {
      model.disabled = true;
    });
  const push = new Tween(model.okButton, group)
    .to({depth: 1}, 100)
    .repeat(1)
    .yoyo(true);
  const end = createEmptyTweenByGroup(group);

  start.chain(initDepth);
  initDepth.chain(push);
  push.chain(end);

  return {
    start: start,
    end: end
  };
}