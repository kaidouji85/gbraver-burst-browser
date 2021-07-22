// @flow

import type {BatteryCorrectModel} from "../model/battery-correct-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {process} from '../../../animation/process';

/**
 * バッテリー補正を表示する
 *
 * @param model モデル
 * @param correctValue 補正値
 * @return アニメーション
 */
export function show(model: BatteryCorrectModel, correctValue: number): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 1;
    model.correctValue = correctValue;
  })
    .chain(tween(model, t => t.to({opacity: 1}, 400)))
}
