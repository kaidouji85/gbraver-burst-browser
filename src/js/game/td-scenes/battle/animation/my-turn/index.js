// @flow

import {Animate} from "../../../../../animation/animate";
import type {MyTurnAnimationParam} from "./animation-param";

/**
 * マイターン アニメーション
 *
 * @param param パラメータ
 * @param effects バッテリー回復など効果アニメーション
 * @return アニメーション
 */
export function myTurnAnimation(param: MyTurnAnimationParam, effects: Animate): Animate {
  return effects;
}