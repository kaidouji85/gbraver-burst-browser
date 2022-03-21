// @flow
import TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../animation/animate";
import type {ResultIndicatorModel} from "../model/result-indicator-model";
import {tween} from "../../../animation/tween";
import {all} from "../../../animation/all";

/**
 * 端に移動する
 *
 * @param model モデル
 * @return アニメーション
 */
export function moveToEdge(model: ResultIndicatorModel): Animate {
  const duration = 400;
  return all(
    tween(model.worldCoordinate, t => t.to({x: -1, y: 1}, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
    ),
    tween(model, t => t.to({scale: 1,}, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
    )
  );
}