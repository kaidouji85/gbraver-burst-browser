// @flow

import type {GaugeModel} from "../model/gauge-model";
import {Tween, Group} from '@tweenjs/tween.js';

/**
 * ゲージ内容を更新する
 *
 * @param model モデル
 * @param group tweenグループ
 * @param hp 変更するHPの値
 * @param battery 変更するバッテリーの値
 * @return アニメーション
 */
export function refresh(model: GaugeModel, group: Group, hp: number, battery: number): Tween {
  return new Tween(model, group)
    .to({hp: hp, battery: battery}, 300);
}