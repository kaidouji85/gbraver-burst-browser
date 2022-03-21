// @flow
import TWEEN from '@tweenjs/tween.js';
import type {ResultIndicatorModel} from "../model/result-indicator-model";
import {Animate} from "../../../animation/animate";
import {process} from '../../../animation/process';
import {tween} from "../../../animation/tween";
import {all} from "../../../animation/all";

/**
 * スライドイン
 *
 * @param model モデル
 * @return アニメーション
 */
export function slideIn(model: ResultIndicatorModel): Animate {
  const duration = 400;
  const distance = 100;
  return process(() => {
    model.opacity = 0;
    model.scale = 2;
    model.position.x = -distance;
    model.position.y = 0;
  }).chain(all(
    tween(model.position, t => t.to({x: `+${distance}`}, duration)
      .easing(TWEEN.Easing.Quadratic.Out)),
    tween(model, t => t.to({opacity: 1}, duration)
      .easing(TWEEN.Easing.Quadratic.Out))
    ));
}