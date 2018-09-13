// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";

const BASE_DURATION = 16;

/**
 * バッテリー変更アニメ
 *
 * @param model バッテリースライダーモデル
 * @param tweenGroup Tweenグループ
 * @param toBattery 変更するバッテリー値
 * @return tween
 */
export function changeBattery(model: BatterySelectorModel, tweenGroup: Group, toBattery: number): Tween {
  const duration = BASE_DURATION * Math.abs(model.slider.battery - toBattery) / model.slider.max;
  return new Tween(model.slider, tweenGroup)
    .to({battery: toBattery}, duration);
}