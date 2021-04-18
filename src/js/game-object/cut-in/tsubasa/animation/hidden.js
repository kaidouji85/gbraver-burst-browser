// @flow

import {Animate} from "../../../../animation/animate";
import type {TsubasaModel} from "../model/tsubasa-model";
import {tween} from "../../../../animation/tween";
import {process} from "../../../../animation/process";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: TsubasaModel): Animate {
  return process(() => {
    model.opacity = 1;
    model.scale = 1;
  })
    .chain(tween(model, t => t.to({opacity: 0, scale: 1.2}, 300)));
}