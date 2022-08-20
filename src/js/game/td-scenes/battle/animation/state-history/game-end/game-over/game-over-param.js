// @flow
import type {GameEndX, GameOver, GameStateX} from "gbraver-burst-core";
import {TDCamera} from "../../../../../../../game-object/camera/td";
import type {TDArmdozerObjects} from "../../../../view/td/armdozer-objects/armdozer-objects";
import type {StateAnimationProps} from "../../state-animation-props";

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
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @return 変換結果
 */
export function toGameOverParam(props: StateAnimationProps, gameState: GameStateX<GameEndX<GameOver>>): ?GameOverParam {
  const winnerArmdozer = props.view.td.armdozerObjects.find(v => v.playerId === gameState.effect.result.winner);
  if (!winnerArmdozer) {
    return null;
  }

  const tdArmdozer: TDArmdozerObjects = winnerArmdozer;
  return {
    winnerTdArmdozer: tdArmdozer,
    tdCamera: props.view.td.camera,
  };
}