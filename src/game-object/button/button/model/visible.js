// @flow

import {Group, Tween} from '@tweenjs/tween.js';
import type {ButtonModel} from "./button-model";

/**
 * ボタンの表示・非表示アニメーション
 *
 * @param model ボタンモデル
 * @param group Tweenグループ
 * @param isVisible 表示フラグ、trueで表示する「
 * @return アニメーション
 */
export function visible(model: ButtonModel, group: Group, isVisible: boolean): Tween {
  const opacity = isVisible ? 1 : 0;
  return new Tween(model, group)
    .to({opacity}, 300);
}
