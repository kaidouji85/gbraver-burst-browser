// @flow

import type {SkyBrightnessModel} from "../model/sky-brightness-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/**
 * 空の明るさを変更する
 *
 * @param model モデル
 * @param value 空の明るさ
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function brightness(model: SkyBrightnessModel, value: number, duration: number): Animate {
  return tween(model, t => t.to({brightness: value}, duration));
}