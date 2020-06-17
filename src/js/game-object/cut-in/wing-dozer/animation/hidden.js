// @flow

import {Animate} from "../../../../animation/animate";
import type {WingDozerCutInModel} from "../model/wing-dozer-cutin-model";
import {tween} from "../../../../animation/tween";

/**
 * カットインを消す
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: WingDozerCutInModel): Animate {
  return tween(model, t => t.to({opacity: 0, scale: 1.1}, 300));
}