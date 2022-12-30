// @flow

import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import {GenesisBraver} from "../../../../../../game-object/armdozer/genesis-braver/genesis-braver";
import type {BattleAnimationParamX} from "../animation-param";

/**
 * ジェネシスブレイバー 戦闘アニメーション パラメータ
 * @template RESULT 戦闘結果
 */
export type GenesisBraverBattle<RESULT> = BattleAnimationParamX<GenesisBraver, RESULT>;

/**
 * ジェネシスブレイバー 攻撃アニメーション
 * @template RESULT 戦闘結果
 * @param param パラメータ
 * @return アニメーション
 */
export function genesisBraverAttack<RESULT>(param: GenesisBraverBattle<RESULT>): Animate {
  return empty();
}