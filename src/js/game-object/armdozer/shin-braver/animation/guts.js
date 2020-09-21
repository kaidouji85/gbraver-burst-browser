// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverModel} from "../model/shin-braver-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {delay} from "../../../../animation/delay";
import {ShinBraverSounds} from "../sounds/shin-braver-sounds";

/**
 * 腕振り上げ
 *
 * @param model モデル
 * @return アニメーション
 */
function gutsUp(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS_UP';
    model.animation.frame = 0;
  }).chain(tween(model.animation, t => t.to({frame: 1}, 200)))
}

/**
 * 待ち
 *
 * @return アニメーション
 */
function wait(): Animate {
  return delay(300);
}

/**
 * 腕振り下げ
 *
 * @param model モデル
 * @return アニメーション
 */
function gutsDown(model: ShinBraverModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS_DOWN';
    model.animation.frame = 0;
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}

/**
 * ガッツ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function guts(model: ShinBraverModel, sounds: ShinBraverSounds): Animate {
  return process(() => {
    sounds.motor.play();
  })
    .chain(gutsUp(model))
    .chain(wait())
    .chain(process(() => {
      sounds.motor.play();
    }))
    .chain(gutsDown(model));
}

/**
 * ターンスタート用 ガッツ
 *
 * @param model モデル
 * @param sounds 効果音
 * @return アニメーション
 */
export function gutsForturnStart(model: ShinBraverModel, sounds: ShinBraverSounds): Animate {
  return process(() => {
    sounds.motor.play();
  })
    .chain(gutsUp(model))
    .chain(wait())
    .chain(gutsDown(model));
}