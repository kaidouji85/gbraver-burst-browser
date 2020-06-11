// @flow

import {Animate} from "../../../../animation/animate";
import {process} from '../../../../animation/process';
import type {NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";
import {tween} from "../../../../animation/tween";
import {delay} from "../../../../animation/delay";
import {all} from "../../../../animation/all";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: NeoLandozerCutInModel): Animate {
  return all(
    process(() => {
      model.animation.type = 'CUT_IN_UP';
      model.animation.frame = 0;
    })
      .chain(tween(model.animation, t => t.to({frame: 1}, 200)))
      .chain(delay(300))
      .chain(process(() => {
        model.animation.type = 'CUT_IN_DOWN';
        model.animation.frame = 0;
      }))
      .chain(tween(model.animation, t => t.to({frame: 1}, 200))),

    process(() => {
      model.opacity = 0;
    }).chain(tween(model, t => t.to({opacity: 1}, 600))),

    process(() => {
      model.scale = 0.9;
    }).chain(tween(model, t => t.to({scale: 1}, 300)))
  );
}