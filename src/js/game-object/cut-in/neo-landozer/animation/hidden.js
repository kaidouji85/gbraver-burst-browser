// @flow

import {Animate} from "../../../../animation/animate";
import type {NeoLandozerCutInModel} from "../model/neo-landozer-cutin-model";
import {tween} from "../../../../animation/tween";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: NeoLandozerCutInModel): Animate {
  return tween(model, t => t.to({opacity: 0}, 300));
}
