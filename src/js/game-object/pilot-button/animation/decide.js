// @flow

import {Animate} from "../../../animation/animate";
import {tween} from "../../../animation/tween";
import type {PilotButtonModel} from "../model/pilot-button-model";

/**
 * ボタンクリック
 *
 * @param model モデル
 * @return アニメーション
 */
export function decide(model: PilotButtonModel): Animate {
  return tween(model, t => t.to({scale: 1.2}, 100))
    .chain(tween(model, t => t.to({scale: 1}, 100)));
}
