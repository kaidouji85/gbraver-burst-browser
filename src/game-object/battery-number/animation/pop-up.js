// @flow

import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import type {BatteryNumberModel} from "../model/battery-number-model";
import {Gourp, Tween} from '@tweenjs/tween.js';

/**
 * バッテリー数字を表示する
 *
 * @param model モデル
 * @param group tweenグループ
 * @param battery バッテリーの値
 * @return アニメーション
 */
export function popUp(model: BatteryNumberModel, group: Gourp, battery: number): MultiTween {
  const start = new Tween(model, group)
    .to({alpha: 0, battery: battery}, 0);
  const visible = new Tween(model, group)
    .to({alpha: 1}, 300);
  const wait = new Tween({}, group)
    .delay(1000);
  const invisible = new Tween(model, group)
    .to({alpha: 0}, 300);

  start.chain(visible);
  visible.chain(wait);
  wait.chain(invisible);

  return {
    start: start,
    end: invisible
  };
}