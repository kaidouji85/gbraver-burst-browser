// @flow

import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {process} from '../../../animation/process';
import type {PilotButtonModel} from "../model/pilot-button-model";
import {PilotButtonSounds} from "../sounds/pilot-button-sounds";

/**
 * ボタンクリック
 *
 * @param model モデル
 * @return アニメーション
 */
export function decide(model: PilotButtonModel, sounds: PilotButtonSounds): Animate {
  return process(() => {
    model.disabled = true;
    sounds.pushButton.play();
  })
    .chain(tween(model, t => t.to({scale: 1.2}, 100)))
    .chain(tween(model, t => t.to({scale: 1}, 100)));
}
