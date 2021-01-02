// @flow

import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";
import {LightningDozerSounds} from "../sounds/lightning-dozer-sounds";
import {all} from "../../../../animation/all";

/**
 * ため
 *
 * @param model モデル
 * @return アニメーション
 */
function gutsUp(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'GUTS_UP';
    model.animation.frame = 0;
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)))
}

/**
 * 待ち
 *
 * @return アニメーション
 */
function wait(): Animate {
  return delay(600);
}

/**
 * 決めポーズ
 *
 * @param model モデル
 * @return アニメーション
 */
function gutsDown(model: LightningDozerModel): Animate {
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
export function guts(model: LightningDozerModel, sounds: LightningDozerSounds): Animate {
  return process(() => {
    model.animation.type = 'GUTS_UP';
    model.animation.frame = 0;
    sounds.motor.play();
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)))
    .chain(delay(600))
    .chain(process(() => {
      model.animation.type = 'GUTS_DOWN';
      model.animation.frame = 0;
      sounds.motor.play();
    }))
    .chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}