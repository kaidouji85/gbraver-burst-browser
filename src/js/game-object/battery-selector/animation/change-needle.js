// @flow

import TWEEN from "@tweenjs/tween.js";
import type {BatterySelectorModel} from "../model";
import {tween} from "../../../animation/tween";
import {Animate} from "../../../animation/animate";

const MAX_DURATION = 500;

/**
 * メーター針を変化させる
 *
 * @param model モデル
 * @param group Tweenグループ
 * @param needle メーター針の値
 * @return アニメーション
 */
export function changeNeedle(model: BatterySelectorModel, group: typeof TWEEN.Group, needle: number): Animate {
  const duration = Math.abs(model.needle - needle) * MAX_DURATION;
  return tween(model, t => t
    .to({needle: needle}, duration)
  ,group);
}