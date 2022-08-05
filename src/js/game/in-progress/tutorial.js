// @flow
import type {GameEndResult, PlayerId} from "gbraver-burst-core";
import {playerUuid} from "../../uuid/player";

/** チュートリアル */
export type Tutorial = {
  type: 'Tutorial',
  /** プレイヤーID */
  playerId: PlayerId
};

/**
 * チュートリアルステートを生成するヘルパー関数
 *
 * @return 生成結果
 */
export function createTutorial(): Tutorial {
  return {type: 'Tutorial', playerId: playerUuid()};
}

/**
 * チュートリアルで勝利したかを判定する
 * 
 * @param tutorial チュートリアルのステート
 * @param gameEndResult ゲーム終了結果
 * @return 判定結果、trueでチュートリアルで勝利した
 */
export function isTutorialWin(tutorial: Tutorial, gameEndResult: GameEndResult): boolean {
  return gameEndResult.type === 'GameOver' && gameEndResult.winner === tutorial.playerId;
}