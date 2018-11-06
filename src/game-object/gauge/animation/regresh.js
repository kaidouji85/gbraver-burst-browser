// @flow

import type {GaugeModel} from "../model/gauge-model";
import {Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../animation/tween-animation";
import {tween} from "../../../animation/tween";

/**
 * ゲージ内容を更新する
 *
 * @param model モデル
 * @param hp 変更するHPの値
 * @param battery 変更するバッテリーの値
 * @return アニメーション
 */
export function refresh(model: GaugeModel, hp: number, battery: number): TweenAnimation {
  return tween(new Tween(model)
    .to({hp: hp, battery: battery}, 300)
  );
}