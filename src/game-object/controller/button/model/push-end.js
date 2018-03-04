// @flow
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./button-model";

const SPEED = 50;

/** ボタン押し込み終了アニメーション */
export function pushEnd(model: ButtonModel, tweenGroup: Group): Tween {
  const duration = SPEED * (model.depth);
  return new Tween(model, tweenGroup)
    .to({depth: 0}, duration);
}