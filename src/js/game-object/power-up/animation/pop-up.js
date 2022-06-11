// @flow
import {Animate} from "../../../animation/animate";
import {delay} from "../../../animation/delay";
import {process} from '../../../animation/process';
import {tween} from "../../../animation/tween";
import type {PowerUpModel} from "../model/power-up-model";
import {PowerUpSounds} from "../sounds/power-up-sounds";

/**
 * ポップアップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function popUp(model: PowerUpModel, sounds: PowerUpSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 1.2;
    sounds.benefitEffect.play();
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 400)))
    .chain(delay(600))
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.1}, 200)));
}