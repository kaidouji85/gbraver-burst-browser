// @flow

import {Animate} from "../../../../../../animation/animate";
import type {GameOverParam, GameOverParamX} from "./animation-param";
import {NeoLandozerTD} from "../../../view/td/armdozer-objects/neo-landozer";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer} from "../../td-camera";

/**
 * ネオランドーザ ゲームオーバ
 */
export type NeoLandozerGameOver = GameOverParamX<NeoLandozerTD>;

/**
 * ネオランドーザゲームオーバにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castNeoLandozerGameOver(origin: GameOverParam): ?NeoLandozerGameOver {
  if (origin.winnerTdArmdozer instanceof NeoLandozerTD) {
    const td: NeoLandozerTD = origin.winnerTdArmdozer;
    return ((origin: any): GameOverParamX<typeof td>);
  }

  return null;
}

/**
 * ネオランドーザ 勝利
 * 
 * @param param パラメータ
 * @return アニメーション
 */
export function neoLandozerWin(param: NeoLandozerGameOver): Animate {
  return all(
    param.winnerTdArmdozer.neoLandozer.guts(),
    attentionArmDozer(param.tdCamera, param.winnerTdArmdozer.neoLandozer, 400)
  );
}