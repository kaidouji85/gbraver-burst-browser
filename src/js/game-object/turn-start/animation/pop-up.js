// @flow

import type {TurnStartModel} from "../model/turn-start-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {delay} from "../../../animation/delay";
import {TurnStartSounds} from "../sounds/turn-start-sounds";
import {process} from '../../../animation/process';

/**
 * ポップアップ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function popUp(model: TurnStartModel, sounds: TurnStartSounds): Animate {
  return process(() => {
    sounds.turnStart.play();
    model.opacity = 0;
    model.scale = 2;
  })
    .chain(tween(model, t => t.to({opacity: 1, scale: 1}, 300)))
    .chain(delay(1500))
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.3}, 300)));
}