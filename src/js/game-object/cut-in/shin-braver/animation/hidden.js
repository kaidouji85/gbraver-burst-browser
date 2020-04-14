// @flow

import {Animate} from "../../../../animation/animate";
import {tween} from "../../../../animation/tween";
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ShinBraverCutInModel): Animate {
  return tween(model, t => t.to({opacity: 0, scale: 1.1}, 300));
}
