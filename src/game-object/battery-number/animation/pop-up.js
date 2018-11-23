// @flow

import type {BatteryNumberModel} from "../model/battery-number-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";

/**
 * バッテリー数字を表示する
 *
 * @param model モデル
 * @param battery バッテリーの値
 * @return アニメーション
 */
export function popUp(model: BatteryNumberModel, battery: number): Animate {
  return tween(model, t => t
    .to({alpha: 0, battery: battery}, 0)
  ).chain(
    tween(model, t => t
      .to({alpha: 1}, 300)
    )
  ).chain(
    delay(1000)
  ).chain(
    tween(model, t => t
      .to({alpha: 0}, 300)
    )
  );
}