// @flow

import {Group} from '@tweenjs/tween.js';
import type {BatterySelectorModel} from "../model/battery-selector";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

const BASE_DURATION = 300;

/**
 * バッテリー変更アニメ
 *
 * @param model バッテリースライダーモデル
 * @param group Tweenグループ
 * @param toBattery 変更するバッテリー値
 * @return アニメーション
 */
export function changeBattery(model: BatterySelectorModel, group: Group, toBattery: number): Animate {
  const duration = BASE_DURATION * Math.abs(model.slider.battery - toBattery) / model.slider.max;
  return tween(model.slider, t =>
      t.to({battery: toBattery}, duration),
    group
  );
}