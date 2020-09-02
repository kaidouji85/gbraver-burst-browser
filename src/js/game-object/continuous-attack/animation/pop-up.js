// @flow

import type {ContinuousAttackModel} from "../model/continuous-attack-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import {ContinuousAttackSounds} from "../sounds/continuous-attack-sounds";
import {process} from '../../../animation/process';

/**
 * ポップアップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function popUp(model: ContinuousAttackModel, sounds: ContinuousAttackSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 1.1;
    sounds.benefitEffect.play();
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 300)))
    .chain(delay(1000))
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.05}, 300)));
}