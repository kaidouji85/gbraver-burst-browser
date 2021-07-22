// @flow

import {Animate} from "../../../animation/animate";
import type {BatteryCorrectModel} from "../model/battery-correct-model";
import {process} from '../../../animation/process';
import {tween} from "../../../animation/tween";
import {all} from "../../../animation/all";
import {ARMDOZER_EFFECT_STANDARD_Y} from "../../armdozer/position";

/**
 * ポップアップ表示
 *
 * @param model モデル
 * @param value バッテリー補正の値
 * @return アニメーション
 */
export function popUp(model: BatteryCorrectModel, value: number): Animate {
  return process(() => {
    model.position.y = ARMDOZER_EFFECT_STANDARD_Y + 80;
    model.opacity = 1;
    model.correctValue = value;
  })
    .chain(all(
      tween(model.position, t => t.to({y: '+10'}, 1000)),
      tween(model, t => t.to({opacity: 0}, 1000)),
    ));
}