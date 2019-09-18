// @flow

import {Animate} from "../../../animation/animate";
import type {GaugeModel} from "../model/gauge-model";
import {tween} from "../../../animation/tween";

/** HPを変更するアニメーション */
export function hp(model: GaugeModel, value: number): Animate {
  return tween(model, t => t
    .to({hp: value}, 300)
  );
}
