// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {WingDozerModel} from "../model/wing-dozer-model";

/**
 * ノックバック -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function knockBackToStand(model: WingDozerModel): Animate {
  return process(() => {
    model.animation.frame = 1;
    model.animation.type = 'KNOCK_BACK';
  })
    .chain(tween(model.animation, t => t.to({frame: 0}, 300)))
    .chain(process(() => {
      model.animation.frame = 0;
      model.animation.type = 'STAND';
    })
  );
}