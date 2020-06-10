// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {delay} from "../../../../animation/delay";
import {ShinBraverSounds} from "../sounds/shin-braver-sounds";

/**
 * ターンスタート
 *
 * @param model モデル
 * @return アニメーション
 */
export function turnStart(model: ShinBraverModel, sounds: ShinBraverSounds): Animate {
  return process(() => {
    model.animation.type = 'GUTS_UP';
    model.animation.frame = 0;
    sounds.motor.play();
  }).chain(tween(model.animation, t => t.to({frame: 1}, 300)))
    .chain(delay(200))
    .chain(process(() => {
      model.animation.type = 'GUTS_DOWN';
      model.animation.frame = 0;
      sounds.motor.play();
    }))
    .chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}