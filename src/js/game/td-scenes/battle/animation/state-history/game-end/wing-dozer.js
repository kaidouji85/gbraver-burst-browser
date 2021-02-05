// @flow

import {Animate} from "../../../../../../animation/animate";
import type {GameOverParam, GameOverParamX} from "./animation-param";
import {WingDozerTD} from "../../../view/td/armdozer-objects/wing-dozer";
import {all} from "../../../../../../animation/all";
import {attentionArmDozer} from "../../td-camera";

/**
 * ウィングドーザ ゲームオーバ
 */
export type WingDozerGameOver = GameOverParamX<WingDozerTD>;

/**
 * ウィングドーザ ゲームオーバにキャストする
 * キャストできない場合はnullを返す
 *
 * @param origin キャスト元
 * @return キャスト結果
 */
export function castWingDozerGameOver(origin: GameOverParam): ?WingDozerGameOver {
  if (origin.winnerTdArmdozer instanceof WingDozerTD) {
    const td: WingDozerTD = origin.winnerTdArmdozer;
    return ((origin: any): GameOverParamX<typeof td>);
  }

  return null;
}

/**
 * ウィングドーザ 勝利
 *
 * @param param パラメータ
 * @return アニメーション
 */
export function wingDozerWin(param: WingDozerGameOver): Animate {
  return all(
    param.winnerTdArmdozer.wingDozer.dash(),
    attentionArmDozer(param.tdCamera, param.winnerTdArmdozer.wingDozer, 400)
  );
}