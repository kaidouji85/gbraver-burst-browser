// @flow

import type {DamageIndicatorModel} from "../model/damage-indicator-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import {process} from '../../../animation/process';

/**
 * ダメージを表示する
 *
 * @param model モデル
 * @param damage ダメージ
 * @return アニメーション
 */
export function popUp(model: DamageIndicatorModel, damage: number): Animate {
  return process(() => {
    model.opacity = 0;
    model.damage = damage;
    model.scale = 1.2;
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 300)))
    .chain(delay(1000))
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.05}, 300)));
}