// @flow

import * as TWEEN from '@tweenjs/tween.js';
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import type {BatterySelectorModel} from "../model";

/**
 * プラスボタン ポップ
 *
 * @param model モデル
 * @param group Tweenグループ
 * @return アニメーション
 */
export function batteryPlusPop(model: BatterySelectorModel, group: typeof TWEEN.Group): Animate {
  return tween(model, t => t.to({plusButtonScale: 1.1}, 100), group)
    .chain(tween(model, t => t.to({plusButtonScale: 1}, 100), group))
}