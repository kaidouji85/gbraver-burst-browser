// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerModel} from "../model/neo-landozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {NeoLandozerSounds} from "../sounds/neo-landozer-sounds";
import {delay} from "../../../../animation/delay";

/**
 * ターンスタート -> 立ち
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function turnStartToStand(model: NeoLandozerModel, sounds: NeoLandozerSounds): Animate {
  return process(() => {
    model.animation.type = 'GUTS_DOWN';
    model.animation.frame = 1;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'GUTS_UP';
      model.animation.frame = 1;
    }))
    .chain(delay(300))
    .chain(process(() => {
      sounds.motor.play();
    }))
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.type = 'STAND';
      model.animation.frame = 0;
    }));
}