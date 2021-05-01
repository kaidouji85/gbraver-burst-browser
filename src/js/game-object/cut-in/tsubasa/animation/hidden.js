// @flow

import {Animate} from "../../../../animation/animate";
import type {TsubasaModel} from "../model/tsubasa-model";
import {tween} from "../../../../animation/tween";
import {process} from "../../../../animation/process";
import {all} from "../../../../animation/all";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: TsubasaModel): Animate {
  return process(() => {
    model.opacity = 1;
  })
    .chain(all(
      tween(model, t => t.to({opacity: 0}, 300)),
      tween(model.position, t => t.to({x: '+100'}, 300)),
    ));
}