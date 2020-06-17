// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";
import type {WingDozerModel} from "../model/wing-dozer-model";

/**
 * ガード
 *
 * @model モデル
 * @return アニメーション
 */
export function guard(model: WingDozerModel): Animate {
  const motion = process(() => {
    model.animation.frame = 1;
    model.animation.type = 'GUARD';
  });
  const position = tween(model.position, t => t
    .to({x: '+20'}, 100)
  ).chain(tween(model.position, t => t
    .to({x: '-20'}, 100)
  ));

  return all(
    motion,
    position
  )
}