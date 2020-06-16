// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";
import {all} from "../../../../animation/all";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: WingDozerCutInModel): Animate {
  return all(
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