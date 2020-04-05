// @flow

import {Animate} from "../../../../animation/animate";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";

/**
 * ガード
 *
 * @param model モデル
 * @return アニメーション
 */
export function guard(model: LightningDozerModel): Animate {
  return all(
    process(() => {
      model.animation.frame = 1;
      model.animation.type = 'GUARD';
    }),
    tween(model.position, t => t.to({x: '+20'}, 100))
      .chain(tween(model.position, t => t.to({x: '-20'}, 100)))
  );
}