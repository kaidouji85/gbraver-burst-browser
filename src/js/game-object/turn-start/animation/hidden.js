// @flow

import type {TurnStartModel} from "../model/turn-start-model";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";

/**
 * 表示する
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: TurnStartModel): Animate {
  return tween(model, t=>t
    .to({opacity: 0}, 300)
  );
}