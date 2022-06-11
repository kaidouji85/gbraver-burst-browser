// @flow

import {all} from "../../../../animation/all";
import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {LightningDozerModel} from "../model/lightning-dozer-model";

/**
 * アームハンマー
 *
 * @param model モデル
 * @return アニメーション
 */
export function armHammer(model: LightningDozerModel): Animate {
  return all(
    process(() => {
      model.animation.type = 'HM_ATTACK';
      model.animation.frame = 0;
    }).chain(tween(model.animation, t => t.to({frame: 1}, 100))),

    tween(model.position, t => t.to({x: '-60'}, 100))
  );
}
