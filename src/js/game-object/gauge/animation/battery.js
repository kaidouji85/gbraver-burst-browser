// @flow

import {Animate} from "../../../animation/animate";
import type {GaugeModel} from "../model/gauge-model";
import {tween} from "../../../animation/tween";
import {all} from "../../../animation/all";

/** バッテリーを変更するアニメーション */
export function battery(model: GaugeModel, value: number): Animate {
  const animations = model.batteryList.map(v => {
    const opacity = v.value <= value ? 1 : 0;
    return tween(v, t => t.to({opacity: opacity}, 300));
  });
  return all(...animations);
}
