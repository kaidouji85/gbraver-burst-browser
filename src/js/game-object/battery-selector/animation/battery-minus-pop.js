// @flow

import * as TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../animation/animate";
import type {BatterySelectorModel} from "../model";
import {tween} from "../../../animation/tween";

/**
 * マイナスボタン ポップ
 *
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function batteryMinusPop(model: BatterySelectorModel, group: typeof TWEEN.Group): Animate {
  return tween(model, t => t.to({minusButtonScale: 1.1}, 100), group)
    .chain(tween(model, t => t.to({minusButtonScale: 1}, 100), group))
}