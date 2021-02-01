// @flow

import {Animate} from "../../../../../../animation/animate";
import type {GameOverParam, GameOverParamX} from "./animation-param";
import {ShinBraverTD} from "../../../view/td/armdozer-objects/shin-braver";

/**
 * シンブレイバー ゲームオーバ パラメータ
 */
export type ShinBraverGameOver = GameOverParamX<ShinBraverTD>;

/**
 * シンブレイバー ゲームオーバ パラメータにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castShinBraverGameOver(origin: GameOverParam): ?ShinBraverGameOver {
  if (origin.winnerTdArmdozer instanceof ShinBraverTD) {
    const td: ShinBraverTD = origin.winnerTdArmdozer;
    return ((origin: any): GameOverParamX<typeof td>);
  }

  return null;
}

/**
 * シンブレイバー 勝利
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function shinBraverWin(param: ShinBraverGameOver): Animate {
  return param.winnerTdArmdozer.shinBraver.guts();
}