// @flow

import type {TDArmdozerObjects} from "../../../view/td/armdozer-objects/armdozer-objects";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameEndX, GameOver, GameStateX} from "gbraver-burst-core";
import {TDCamera} from "../../../../../../game-object/camera/td";

/**
 * ゲームオーバー アニメーションパラメータ
 *
 * @type TD_ARMDOZER 3Dレイヤー アームドーザ固有オブジェクト
 */
export type GameOverParamX<TD_ARMDOZER: TDArmdozerObjects> = {
  tdArmdozer: TD_ARMDOZER,
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
 * @param gameState ゲームステート
 * @return 変換結果
 */
export function toGameEndParam(view: BattleSceneView, gameState: GameStateX<GameEndX<GameOver>>): ?GameOverParam {
  const winnerArmdozer = view.td.armdozerObjects.find(v => v.playerId === gameState.effect.result.winner);
  if (!winnerArmdozer) {
    return null;
  }

  const tdArmdozer: TDArmdozerObjects = winnerArmdozer;
  return {
    tdArmdozer: tdArmdozer,
    tdCamera: view.td.camera,
  };
}