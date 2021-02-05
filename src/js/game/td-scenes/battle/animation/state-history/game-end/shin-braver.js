// @flow

import {Animate} from "../../../../../../animation/animate";
import type {GameOverParam, GameOverParamX} from "./animation-param";
import {ShinBraverTD} from "../../../view/td/armdozer-objects/shin-braver";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer} from "../../td-camera";

/**
 * シンブレイバー ゲームオーバ
 */
export type ShinBraverGameOver = GameOverParamX<ShinBraverTD>;

/**
 * シンブレイバーゲームオーバにキャストする
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
  return all(
    param.winnerTdArmdozer.shinBraver.guts(),
    attentionArmDozer(param.tdCamera, param.winnerTdArmdozer.shinBraver, 400)
  );
}