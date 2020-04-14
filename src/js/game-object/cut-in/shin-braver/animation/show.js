// @flow

import {Animate} from "../../../../animation/animate";
import {process} from '../../../../animation/process';
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";
import {all} from "../../../../animation/all";
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: ShinBraverCutInModel): Animate {
  return all(
    process(() => {
      model.animation.type = 'CUT_IN_UP';
      model.animation.frame = 0;
    }).chain(tween(model.animation, t => t.to({frame: 1}, 300))
    ).chain(delay(100)
    ).chain(process(() => {
        model.animation.type = 'CUT_IN_DOWN';
        model.animation.frame = 0;
      })
    ).chain(tween(model.animation, t => t.to({frame: 1}, 200))),

    process(() => {
      model.opacity = 0;
    }).chain(tween(model, t => t.to({opacity: 1}, 600))),

    process(() => {
      model.scale = 0.9;
    }).chain(tween(model, t => t.to({scale: 1}, 300)))
  );
}