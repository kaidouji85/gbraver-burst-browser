// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinyaModel} from "../model/shinya-model";
import {process} from "../../../../animation/process";
import {tween} from "../../../../animation/tween";

/**
 * カットインを表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: ShinyaModel): Animate {
  return process(() => {
    model.opacity = 0;
    model.scale = 2;
  }).chain(tween(model, t => t.to({opacity: 1, scale: 1}, 500)));
}