// @flow
import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./button-model";

const SPEED = 32;

/** ボタン押し込み開始アニメーション */
export function pushStart(model: ButtonModel, tweenGroup: Group): Tween {
  const duration = SPEED * (1- model.depth);
  return new Tween(model, tweenGroup)
    .to({depth: 1}, duration);
}