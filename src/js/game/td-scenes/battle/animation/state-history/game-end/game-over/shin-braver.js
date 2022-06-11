// @flow

import {all} from "../../../../../../../animation/all";
import {Animate} from "../../../../../../../animation/animate";
import {ShinBraverTD} from "../../../../view/td/armdozer-objects/shin-braver";
import {dolly, track} from "../../../td-camera";
import type {GameOverParam, GameOverParamX} from "./game-over-param";

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
    track(param.tdCamera, param.winnerTdArmdozer.shinBraver.getObject3D().position.x, 800),
    dolly(param.tdCamera, '-60', 800)
  );
}