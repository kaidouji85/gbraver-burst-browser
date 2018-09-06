// @flow

import type {MultiTween} from "../../../tween/multi-tween/multi-tween";
import type {BatteryNumberModel} from "../model/battery-number-model";
import {Tween, Gourp} from '@tweenjs/tween.js';
import {createEmptyTween} from "../../../tween/empty-tween";

/**
 * バッテリー数字を表示する
 *
 * @param model モデル
 * @param group tweenグループ
 * @param battery バッテリーの値
 * @return アニメーション
 */
export function show(model: BatteryNumberModel, group: Gourp, battery: number): MultiTween {
  const startBuffer = createEmptyTween();
  const visible = Tween(model, group)
    .onStart(() => {
      model.alpha = 0;
      model.battery = battery;
    })
    .to({
      alpha: 1
    });
  const wait = createEmptyTween()
    .delay(3000);
  const endBuffer = createEmptyTween();

  startBuffer.chain(visible);
  visible.chain(wait);
  wait.chain(endBuffer);

  return {
    start: startBuffer,
    end: endBuffer
  };
}