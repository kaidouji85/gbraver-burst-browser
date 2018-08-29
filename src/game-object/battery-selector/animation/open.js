// @flow

import type {BatterySelectorModel} from "../model/battery-selector";
import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import {Group, Tween} from '@tweenjs/tween.js';
import type {OkButtonLabel} from "../model/ok-button";

/**
 * バッテリーセレクタを開く
 *
 * @param model モデル
 * @param group Tweenグループ
 * @param initialValue 初期値
 * @param maxEnable 選択可能な最大値
 * @param okButtonLabel OKボタンラベル
 * @return MultiTween
 */
export function open(model: BatterySelectorModel, group: Group,initialValue: number, maxEnable: number, okButtonLabel: OkButtonLabel): Tween {
  return new Tween(model, group)
    .onStart(() => {
      model.disabled = true;
      model.opacity = 0;
      model.slider.enableMax = maxEnable;
      model.slider.battery = initialValue;
      model.okButton.label = okButtonLabel;
    })
    .to({opacity: 1}, 300)
    .onComplete(() => {
      model.disabled = false;
    });
}