// @flow

import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import type {RecoverBatteryModel} from "../model/recover-battery-model";
import {delay} from "../../../animation/delay";
import {RecoverBatterySounds} from "../sounds/recover-battery-sounds";
import {process} from '../../../animation/process';

/**
 * バッテリー回復 表示アニメーション
 *
 * @param model モデル
 * @param sounds 効果音
 * @param value 回復値
 * @return アニメーション
 */
export function popUp(model: RecoverBatteryModel, sounds: RecoverBatterySounds, value: number): Animate {
  return process(() => {
    model.scale = 1.5;
    model.value = value;
    model.opacity = 0;
    sounds.recoverBattery.play();
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 400)))
    .chain(delay(2000))
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.1}, 300)));
}