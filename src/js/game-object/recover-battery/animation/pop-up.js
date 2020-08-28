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
    sounds.recoverBattery.play();
  })
    .chain(tween(model, t => t.to({opacity: 0, value: value}, 0)))
    .chain(tween(model, t => t.to({opacity: 1}, 300)))
    .chain(delay(500))
    .chain(tween(model, t => t.to({opacity: 0}, 300)));
}