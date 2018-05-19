// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./button-model";

export function visible(model: ButtonModel, group: Group, isVisible: boolean): Tween {
  const opacity = isVisible ? 1 : 0;
  return new Tween(model, group)
    .to({opacity}, 300);
}