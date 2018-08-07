// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySliderModel} from "../model/battery-slider-model";

const BASE_DURATION = 32;

/**
 * バッテリー変更アニメ
 *
 * @param model バッテリースライダーモデル
 * @param tweenGroup Tweenグループ
 * @param toBattery 変更するバッテリー値
 * @return tween
 */
export function changeBattery(model: BatterySliderModel, tweenGroup: Group, toBattery: number): Tween {
  const duration = BASE_DURATION * Math.abs(model.slider.battery - toBattery) / model.slider.max;
  return new Tween(model.slider, tweenGroup)
    .to({battery: toBattery}, duration);
}