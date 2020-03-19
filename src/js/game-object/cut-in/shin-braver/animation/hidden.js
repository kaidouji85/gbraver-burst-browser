// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";
import {process} from "../../../../animation/process";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ShinBraverCutInModel): Animate {
  return process(() => {
    model.opacity = 1;
    model.scale = 1;
    model.animation.type = 'BurstRelease';
  }).chain(all(
    tween(model, t => t.to({opacity: 0}, 300)),
    tween(model, t => t.to({scale: 1.2}, 300))
  ));
}