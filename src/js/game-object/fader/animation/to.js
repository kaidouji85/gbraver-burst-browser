// @flow

import {Animate} from "../../../animation/animate";
import type {FaderModel} from "../model/fader-model";
import {tween} from "../../../animation/tween";

/**
 * フェーダを手動で変更
 *
 * @param model モデル
 * @param opacity 透明度
 * @param duration アニメーション時間
 * @return アニメーション
 */
export function to(model: FaderModel, opacity: number, duration: number): Animate {
  return tween(model, t => t.to({opacity: opacity}, duration));
}