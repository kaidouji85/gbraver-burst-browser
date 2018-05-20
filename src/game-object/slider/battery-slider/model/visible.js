// @flow

import type {BatterySliderModel} from "./battery-slider-model";
import {Group, Tween} from '@tweenjs/tween.js';

export function visible(model: BatterySliderModel, group: Group, isVisible: boolean): Tween {
  const opacity = isVisible ? 1 : 0;
  return new Tween(model, group)
    .to({opacity}, 300)
}