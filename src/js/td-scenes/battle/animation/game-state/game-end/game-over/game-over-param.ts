import { GameOver } from "gbraver-burst-core";

import { TDCamera } from "../../../../../../game-object/camera/td";
import { TDArmdozerObjects } from "../../../../view/td/armdozer-objects/armdozer-objects";
import { StateAnimationProps } from "../../state-animation-props";

/**
 * ゲームオーバー アニメーションパラメータ
 * @template TD_ARMDOZER 3Dレイヤー アームドーザ固有オブジェクト
 */
export type GameOverParamX<TD_ARMDOZER extends TDArmdozerObjects> = {
  winnerTdArmdozer: TD_ARMDOZER;
  tdCamera: TDCamera;
};

/** ゲームオーバー アニメーションパラメータ */
export type GameOverParam = GameOverParamX<TDArmdozerObjects>;

/**
 * ゲームオーバー アニメーションパラメータに変換する
 * 変換できない場合はnullを返す
 * @param props 戦闘シーンプロパティ
 * @param gameOver ゲームオーバー情報
 * @returns 変換結果
 */
export function toGameOverParam(
  props: StateAnimationProps,
  gameOver: GameOver,
): GameOverParam | null {
  const winnerTdArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId === gameOver.winner,
  );
  return winnerTdArmdozer
    ? { winnerTdArmdozer, tdCamera: props.view.td.camera }
    : null;
}
