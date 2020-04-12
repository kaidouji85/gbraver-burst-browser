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
  return process(() => {
    model.animation.type = 'CUT_IN_UP';
    model.animation.frame = 0;
    model.opacity = 0;
    model.scale = 1;
  }).chain(all(
    tween(model.animation, t => t.to({frame: 1}, 300)),
    tween(model, t => t.to({opacity: 1}, 300))
  )).chain(delay(100)
  ).chain(process(() => {
      model.animation.type = 'CUT_IN_DOWN';
      model.animation.frame = 0;
    })
  ).chain(tween(model.animation, t => t.to({frame: 1}, 200)));
}