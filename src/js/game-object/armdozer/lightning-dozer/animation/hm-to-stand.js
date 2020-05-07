// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import type {LightningDozerModel} from "../model/lightning-dozer-model";
import {all} from "../../../../animation/all";
import {delay} from "../../../../animation/delay";

/**
 * アームハンマー -> 立ち
 *
 * @param model モデル
 * @return アニメーション
 */
export function hmToStand(model: LightningDozerModel): Animate {
  return all(
    process(() => {
      model.animation.type = 'HM_TO_STAND';
      model.animation.frame = 0;
    }).chain(tween(model.animation, t => t.to({frame: 1}, 300))
    ).chain(process(() => {
        model.animation.type = 'STAND';
        model.animation.frame = 0;
    })).chain(delay(500)
    ).chain(tween(model.position, t => t.to({x: '+80'}, 300)))
  );
}
