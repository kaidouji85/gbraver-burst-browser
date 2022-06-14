// @flow

import {all} from "../../../animation/all";
import {Animate} from "../../../animation/animate";
import {process} from "../../../animation/process";
import {tween} from "../../../animation/tween";
import type {TurnStartModel} from "../model/turn-start-model";

/**
 * 表示アニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function show(model: TurnStartModel): Animate {
  return process(() => {
    model.opacity = 0;
    model.position.x = 200;
  })
    .chain(all(
      tween(model, t => t.to({opacity: 1}, 400)),
      tween(model.position, t => t.to({x: 0}, 400))
    ));
}