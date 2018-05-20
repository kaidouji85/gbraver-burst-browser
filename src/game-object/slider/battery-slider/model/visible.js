// @flow

import type {BatterySliderModel} from "./battery-slider-model";
import {Group, Tween} from '@tweenjs/tween.js';

/**
 * スライダーの表示・非表示アニメーション
 *
 * @param model バッテリースライダーモデル
 * @param group Tweenグループ
 * @param isVisible スライダー表示フラグ、trueで表示する
 * @return アニメーション
 */
export function visible(model: BatterySliderModel, group: Group, isVisible: boolean): Tween {
  const opacity = isVisible ? 1 : 0;
  return new Tween(model, group)
    .to({opacity}, 300);
}