// @flow

import {Animate} from "../../../../../../../animation/animate";
import type {GameOverParam, GameOverParamX} from "./game-over-param";
import {WingDozerTD} from "../../../../view/td/armdozer-objects/wing-dozer";
import {all} from "../../../../../../../animation/all";
import {dolly, track} from "../../../td-camera";

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
    track(param.tdCamera, param.winnerTdArmdozer.wingDozer.getObject3D().position.x, 800),
    dolly(param.tdCamera, '-60', 800)
  );
}