// @flow
import TWEEN from '@tweenjs/tween.js';
import type {TimeScaleButtonModel} from "../model/time-scale-button-model";
import type {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";

/**
 * タイムスケールの値を入れ替える
 * 
 * @param model モデル 
 * @param timeScale タイムスケール
 * @return アニメーション
 */
export function toggle(model: TimeScaleButtonModel, group: typeof TWEEN.Group, timeScale: number): Animate {
  return process(() => {
    model.timeScale = timeScale;
    model.scale = 1;
  }, group)
  .chain(tween(model, t => t.to({scale: 1.1}, 100), group))
    .chain(tween(model, t => t.to({scale: 1}, 100), group));
}