// @flow

import {Animate} from "../../../../animation/animate";
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";
import {tween} from "../../../../animation/tween";
import {all} from "../../../../animation/all";
import {process} from "../../../../animation/process";
import {empty} from "../../../../animation/delay";

/**
 * カットインを非表示にする
 *
 * @param model モデル
 * @return アニメーション
 */
export function hidden(model: ShinBraverCutInModel): Animate {
  return empty();
}