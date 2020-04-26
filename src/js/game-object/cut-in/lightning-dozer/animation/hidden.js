// @flow

import {Animate} from "../../../../animation/animate";
import {tween} from "../../../../animation/tween";
import type {LightningDozerCutInModel} from "../model/lightning-dozer-cutin-model";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: LightningDozerCutInModel): Animate {
  return tween(model, t => t.to({opacity: 0, scale: 1.1}, 300));
}
