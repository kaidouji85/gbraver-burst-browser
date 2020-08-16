// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinyaModel} from "../model/shinya-model";
import {tween} from "../../../../animation/tween";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ShinyaModel): Animate {
  return tween(model, t => t.to({opacity: 0, scale: 1.1}, 300));
}