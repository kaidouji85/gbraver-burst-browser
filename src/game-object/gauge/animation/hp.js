// @flow

import {Animate} from "../../../animation/animate";
import type {GaugeModel} from "../model/gauge-model";
import {tween} from "../../../animation/tween";
import {Tween} from '@tweenjs/tween.js';

/** HPを変更するアニメーション */
export function hp(model: GaugeModel, value: number): Animate {
  return tween(new Tween(model)
    .to({hp: value}, 300)
  );
}
