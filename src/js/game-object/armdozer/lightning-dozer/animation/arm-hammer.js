// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";

/**
 * アームハンマー
 *
 * @param model モデル
 * @return アニメーション
 */
export function armHammer(model: LightningDozerModel): Animate {
  return process(() => {
    model.animation.type = 'HM_ATTACK';
    model.animation.frame = 0;
  }).chain(all(
    tween(model.animation, t => t.to({frame: 1}, 100)),
    tween(model.position, t => t.to({x: '-20'}, 100))
  ));
}
