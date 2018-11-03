// @flow

import type {GaugeModel} from "../model/gauge-model";
import {Group, Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../animation/tween-animation";
import {tween} from "../../../animation/tween";

/**
 * ゲージ内容を更新する
 *
 * @param model モデル
 * @param group tweenグループ
 * @param hp 変更するHPの値
 * @param battery 変更するバッテリーの値
 * @return アニメーション
 */
export function refresh(model: GaugeModel, group: Group, hp: number, battery: number): TweenAnimation {
  return tween(new Tween(model, group)
    .to({hp: hp, battery: battery}, 300)
  );
}