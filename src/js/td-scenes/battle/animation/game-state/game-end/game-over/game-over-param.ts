import { GameOver } from "gbraver-burst-core";

import { BGMManagerContainer } from "../../../../../../bgm/bgm-manager";
import { TDCamera } from "../../../../../../game-object/camera/td";
import { HUDPlayer } from "../../../../view/hud/player";
import { TDArmdozerObjects } from "../../../../view/td/armdozer-objects/armdozer-objects";
import { TDGameObjects } from "../../../../view/td/game-objects";
import { StateAnimationProps } from "../../state-animation-props";

/**
 * ゲームオーバー アニメーションパラメータ
 * @template TD_ARMDOZER 3Dレイヤー アームドーザ固有オブジェクト
 */
export type GameOverParamX<TD_ARMDOZER extends TDArmdozerObjects> = Readonly<BGMManagerContainer> & {
  /** 勝利したアームドーザのTDオブジェクト */
  readonly winnerTdArmdozer: TD_ARMDOZER;
  /** 勝利したHUDプレイヤー */
  readonly winnerHUD: HUDPlayer;
  /** 3Dカメラ */
  readonly tdCamera: TDCamera;
  /** 3Dゲームオブジェクト */
  readonly tdGameObjects: TDGameObjects;
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
  const winnerHUD = props.view.hud.players.find(
    (v) => v.playerId === gameOver.winner,
  );
  if (winnerTdArmdozer == null || winnerHUD == null) {
    return null
  }

  return {
    winnerTdArmdozer,
    winnerHUD,
    tdCamera: props.view.td.camera,
    tdGameObjects: props.view.td.gameObjects,
    bgm: props.bgm
  };
}
