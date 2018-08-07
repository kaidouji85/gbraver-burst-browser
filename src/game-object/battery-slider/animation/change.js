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
export function change(model: BatterySliderModel, tweenGroup: Group, toBattery: number): Tween {
  const duration = BASE_DURATION * Math.abs(model.battery - toBattery) / model.maxBattery;
  return new Tween(model, tweenGroup)
    .to({battery: toBattery}, duration);
}