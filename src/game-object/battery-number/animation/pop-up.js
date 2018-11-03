// @flow

import type {BatteryNumberModel} from "../model/battery-number-model";
import {Gourp, Tween} from '@tweenjs/tween.js';
import {TweenAnimation} from "../../../animation/tween-animation";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";

/**
 * バッテリー数字を表示する
 *
 * @param model モデル
 * @param group tweenグループ
 * @param battery バッテリーの値
 * @return アニメーション
 */
export function popUp(model: BatteryNumberModel, group: Gourp, battery: number): TweenAnimation {
  return tween(new Tween(model, group)
    .to({alpha: 0, battery: battery}, 0)
  ).chain(
    tween(new Tween(model, group)
      .to({alpha: 1}, 300)
    )
  ).chain(
    delay(1000)
  ).chain(
    tween(new Tween(model, group)
      .to({alpha: 0}, 300)
    )
  );
}