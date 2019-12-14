// @flow

import type {TurnStartModel} from "../model/turn-start-model";
import {delay} from "../../../animation/delay";
import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import {all} from "../../../animation/all";

/**
 * ポップアップ
 *
 * @param model モデル
 * @return アニメーション
 */
export function popUp(model: TurnStartModel): Animate {
  return all(
    tween(model, t => t.to({opacity: 0}, 0))
      .chain(tween(model, t => t.to({opacity: 1}, 300))),

    tween(model, t => t.to({scale: 1}, 0))
      .chain(tween(model, t => t.to({scale: 1.2}, 300)))
      .chain(delay(100))
      .chain(tween(model, t => t.to({scale: 1}, 300)))
  ).chain(
    delay(1000)
  ).chain(all(
    tween(model, t => t.to({opacity: 0}, 300)),

    tween(model, t => t.to({scale: 0.8}, 300))
  ));
}