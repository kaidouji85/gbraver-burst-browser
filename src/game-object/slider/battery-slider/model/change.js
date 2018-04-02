// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySliderModel} from "./battery-slider-model";

/**
 * バッテリー変更アニメ
 *
 * @param model バッテリースライダーモデル
 * @param tweenGroup Tweenグループ
 * @param toBattery 変更するバッテリー値
 * @return tween
 */
export function change(model: BatterySliderModel, tweenGroup: Group, toBattery: number): Tween {
  return new Tween(model, tweenGroup)
    .to({animateBattery: toBattery}, 32);
}