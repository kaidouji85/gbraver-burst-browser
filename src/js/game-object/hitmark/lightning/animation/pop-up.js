// @flow

import type {LightningModel} from "../model/lightning-model";
import {Animate} from "../../../../animation/animate";
import {tween} from "../../../../animation/tween";
import {process} from '../../../../animation/process';
import {all} from "../../../../animation/all";

/**
 * エフェクトを一瞬だけ表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function popUp(model: LightningModel): Animate {
  return process(() => {
    model.animation.frame = 0;
    model.opacity = 1;
  }).chain(all(
    tween(model.animation, t => t.to({frame: 1}, 500)),
    tween(model, t => t.to({opacity:0.5}, 400))
      .chain(tween(model, t => t.to({opacity: 0}, 100))),
  ));
}