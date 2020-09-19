// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerModel} from "../model/wing-dozer-model";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {delay} from "../../../../animation/delay";
import {WingDozerSounds} from "../sounds/wing-dozer-sounds";
import {all} from "../../../../animation/all";

/**
 * ダッシュ前半
 *
 * @param model モデル
 * @return アニメーション
 */
function dashUp(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'DASH_UP';
    model.animation.frame = 0;
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 300)))
}

/**
 * 待ち
 *
 * @return アニメーション
 */
function wait(): Animate {
  return delay(500);
}

/**
 * ダッシュ後半
 *
 * @param model モデル
 * @return アニメーション
 */
function dashDown(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.type = 'DASH_DOWN';
    model.animation.frame = 0;
  })
    .chain(tween(model.animation, t => t.to({frame: 1}, 300)));
}

/**
 * ダッシュ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function dash(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return all(
    dashUp(model),
    process(() => {
      sounds.motor.play();
    })
  )
    .chain(wait())
    .chain(all(
      dashDown(model),
      process(() => {
        sounds.motor.play();
      })
    ));
}

/**
 * ターンスタート用 ダッシュ
 *
 * @param model モデル
 * @param sounds 音
 * @return アニメーション
 */
export function dashForTurnStart(model: WingDozerModel, sounds: WingDozerSounds): Animate {
  return all(
    dashUp(model),
    process(() => {
      sounds.motor.play();
    })
  )
    .chain(wait())
    .chain(dashDown(model));
}