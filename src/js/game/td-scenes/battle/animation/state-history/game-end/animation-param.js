// @flow

import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";
import {BattleSceneView} from "../../../view";
import type {GameOver} from "gbraver-burst-core";
import {TDCamera} from "../../../../../../game-object/camera/td";

/**
 * ゲームオーバー アニメーションパラメータ
 *
 * @type TD_ARMDOZER 3Dレイヤー アームドーザ固有オブジェクト
 */
export type GameOverParamX<TD_ARMDOZER: TDArmdozerObjects> = {
  winnerTdArmdozer: TD_ARMDOZER,
  tdCamera: TDCamera,
};

/**
 * ゲームオーバー アニメーションパラメータ
 */
export type GameOverParam = GameOverParamX<TDArmdozerObjects>;

/**
 * ゲームオーバー アニメーションパラメータに変換する
 * 変換できない場合はnullを返す
 *
 * @param view ビュー
 * @param gameOver ゲームオーバー
 * @return 変換結果
 */
export function toGameOverParam(view: BattleSceneView, gameOver: GameOver): ?GameOverParam {
  const winnerArmdozer = view.td.armdozerObjects.find(v => v.playerId === gameOver.winner);
  if (!winnerArmdozer) {
    return null;
  }

  const tdArmdozer: TDArmdozerObjects = winnerArmdozer;
  return {
    winnerTdArmdozer: tdArmdozer,
    tdCamera: view.td.camera,
  };
}