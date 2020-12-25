// @flow

import {Animate} from "../../../../../animation/animate";
import type {MyTurnAnimationParam} from "./animation-param";
import {attentionArmDozer, toInitial} from "../td-camera";
import {delay} from "../../../../../animation/delay";

/**
 * マイターン アニメーション
 *
 * @param param パラメータ
 * @param effects バッテリー回復など効果アニメーション
 * @return アニメーション
 */
export function myTurnAnimation(param: MyTurnAnimationParam, effects: Animate): Animate {
  return attentionArmDozer(param.tdCamera, param.tdArmdozer.sprite(), 500)
    .chain(delay(500))
    .chain(toInitial(param.tdCamera, 500))
    .chain(delay(500));
}