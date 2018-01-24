// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import {ANIMATION_STAND, ShinBraverModel} from "./shin-braver-model";

export function stand(model: ShinBraverModel, tweenGroup: Group): Tween {
  return new Tween(model.animation, tweenGroup)
    .to({frame: 0}, 0)
    .onStart(() => model.animation.type = ANIMATION_STAND);
}