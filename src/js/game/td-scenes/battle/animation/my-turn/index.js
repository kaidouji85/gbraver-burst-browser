// @flow

import {Animate} from "../../../../../animation/animate";
import type {MyTurnAnimationParam} from "./animation-param";
import {attentionArmDozer, toInitial} from "../td-camera";
import {delay} from "../../../../../animation/delay";
import {castShinBraverMyTUrn, shinBraverMyTurn} from "./shin-braver";

/**
 * マイターン アニメーション
 *
 * @param param パラメータ
 * @param effects バッテリー回復など効果アニメーション
 * @return アニメーション
 */
export function myTurnAnimation(param: MyTurnAnimationParam, effects: Animate): Animate {
  const shinBraver = castShinBraverMyTUrn(param);
  if (shinBraver) {
    return shinBraverMyTurn(shinBraver, effects);
  }

  return defaultMyTurn(param, effects);
}

/**
 * デフォルト マイターン アニメーション
 *
 * @param param パラメータ
 * @param effects バッテリー回復など効果アニメーション
 * @return アニメーション
 */
function defaultMyTurn(param: MyTurnAnimationParam, effects: Animate): Animate {
  return attentionArmDozer(param.tdCamera, param.tdArmdozer.sprite(), 500)
    .chain(delay(500))
    .chain(effects)
    .chain(toInitial(param.tdCamera, 500))
    .chain(delay(500));
}