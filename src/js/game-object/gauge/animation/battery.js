// @flow

import {Animate} from "../../../animation/animate";
import type {GaugeModel} from "../model/gauge-model";
import {tween} from "../../../animation/tween";

/** バッテリーを変更するアニメーション */
export function battery(model: GaugeModel, value: number): Animate {
  return tween(model, t => t
    .to({battery: value}, 0)
  );
}
