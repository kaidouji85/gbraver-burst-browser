// @flow

import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import type {BatterySelectorModel} from "../model/battery-selector";
import {Group, Tween} from '@tweenjs/tween.js';
import {createEmptyTweenByGroup} from "../../../tween/empty-tween";

/** 閉じるアニメーション */
export function close(model: BatterySelectorModel, group: Group): MultiTween {
  const start = createEmptyTweenByGroup(group);
  const visible = new Tween(model, group)
    .to({opacity: 1}, 0)
    .onStart(() => {
      model.disabled = true;
    });
  const invisible = new Tween(model, group)
    .to({opacity: 0}, 300);
  const end = createEmptyTweenByGroup(group);

  start.chain(visible);
  visible.chain(invisible);
  invisible.chain(end);

  return {
    start: start,
    end: end
  }
}