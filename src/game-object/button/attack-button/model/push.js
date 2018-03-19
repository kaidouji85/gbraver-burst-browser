// @flow
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./button-model";
import {SPEED} from "./button-model";

/** ボタン押下アニメーション */
export function push(model: ButtonModel, tweenGroup: Group): Tween {
  const duration = SPEED * (1- model.depth);
  return new Tween(model, tweenGroup)
    .to({depth: 1}, duration)
    .repeat(2)
    .yoyo();
}