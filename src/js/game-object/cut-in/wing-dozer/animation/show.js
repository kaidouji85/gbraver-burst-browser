// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";
import {all} from "../../../../animation/all";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: WingDozerCutInModel): Animate {
  return all(
    process(() => {
      model.animation.type = 'BURST_UP';
      model.animation.frame = 0;
    })
      .chain(tween(model.animation, t => t.to({frame: 1}, 200)))
      .chain(delay(300))
      .chain(process(() => {
        model.animation.type = 'BURST_DOWN';
        model.animation.frame = 0;
      }))
      .chain(tween(model.animation, t => t.to({frame: 1}, 200))),

    process(() => {
      model.opacity = 0;
    })
      .chain(tween(model, t => t.to({opacity: 1}, 600))),

    process(() => {
      model.scale = 0.9;
    })
      .chain(tween(model, t => t.to({scale: 1}, 300)))
  );
}