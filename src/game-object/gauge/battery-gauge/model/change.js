// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatteryGaugeModel} from "./battery-gauge-model";

export function change(model: BatteryGaugeModel, tweenGroup: Group, toBattery: number): Tween {
  return new Tween(model, tweenGroup)
    .to({battery: toBattery}, 0);
}