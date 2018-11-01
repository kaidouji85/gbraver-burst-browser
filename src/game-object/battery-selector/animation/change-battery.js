// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import {TweenAnimation} from "../../../animation/tween-animation";

const BASE_DURATION = 300;

/**
 * バッテリー変更アニメ
 *
 * @param model バッテリースライダーモデル
 * @param tweenGroup Tweenグループ
 * @param toBattery 変更するバッテリー値
 * @return tween
 */
export function changeBattery(model: BatterySelectorModel, tweenGroup: Group, toBattery: number): TweenAnimation {
  const duration = BASE_DURATION * Math.abs(model.slider.battery - toBattery) / model.slider.max;
  return new TweenAnimation(new Tween(model.slider, tweenGroup)
    .to({battery: toBattery}, duration)
  );
}