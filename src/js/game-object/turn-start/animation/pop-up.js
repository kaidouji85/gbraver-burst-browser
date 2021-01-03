// @flow

import type {TurnStartModel} from "../model/turn-start-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import {TurnStartSounds} from "../sounds/turn-start-sounds";
import {process} from '../../../animation/process';
import {all} from "../../../animation/all";

/**
 * ポップアップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function popUp(model: TurnStartModel, sounds: TurnStartSounds): Animate {
  return process(() => {
    model.opacity = 0;
    model.position.x = 50;
    sounds.benefitEffect.play();
  })
    .chain(all(
      tween(model, t => t.to({opacity: 1}, 400)),
      tween(model.position, t => t.to({x: 0}, 400))
    ))
    .chain(delay(1000))
    .chain(all(
      tween(model, t => t.to({opacity: 0}, 300)),
      tween(model.position, t => t.to({x: 50}, 300))
    ));
}