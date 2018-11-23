// @flow

import {Animate} from "../../../animation/animate";
import type {GaugeModel} from "../model/gauge-model";
import {tween} from "../../../animation/tween";
import {Tween} from '@tweenjs/tween.js';

/** バッテリーを変更するアニメーション */
export function battery(model: GaugeModel, value: number): Animate {
  return tween(new Tween(model)
    .to({battery: value}, 300)
  );
}
