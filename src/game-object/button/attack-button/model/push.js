// @flow
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./button-model";

/** ボタン押下アニメーション */
export function push(model: ButtonModel, tweenGroup: Group): Tween {
  return new Tween(model, tweenGroup)
    .to({scale: 1.1}, 100)
    .repeat(1)
    .yoyo(true);
}