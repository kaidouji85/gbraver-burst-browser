// @flow

import TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../../animation/animate";
import type {ShockWaveLineModel, ShockWaveModel} from "../model/shock-wave-model";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";

/**
 * 衝撃波アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function popUp(model: ShockWaveModel): Animate {
  return all(
    ...model.lines.map( v => lineAnimation(v))
  )
}

/**
 * 衝撃波軌跡アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
function lineAnimation(model: ShockWaveLineModel): Animate {
  const duration = 1600;
  return process(() => {
    model.opacity = 1;
    model.scale.x = 1.5;
    model.scale.y = 0.8;
    model.distance = 80;
  }).chain(all(
    tween(
      model, t=>
      t.to({opacity: 0, distance: 400}, duration)
        .easing(TWEEN.Easing.Quadratic.Out)
    ),
    tween(
      model.scale,
        t => t.to({y: 3}, duration)
          .easing(TWEEN.Easing.Quadratic.Out)
    )
  ))
}
