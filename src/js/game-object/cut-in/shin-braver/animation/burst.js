// @flow

import {Animate} from "../../../../animation/animate";
import {process} from "../../../../animation/process";
import type {ShinBraverCutInModel} from "../model/shin-braver-cutin-model";
import {all} from "../../../../animation/all";
import {tween} from "../../../../animation/tween";
import {delay, empty} from "../../../../animation/delay";

/**
 * カットインアニメーション
 *
 * @param model モデル
 * @return アニメーション
 */
export function burst(model: ShinBraverCutInModel): Animate {
  return empty();
}