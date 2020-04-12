// @flow

import type {State} from "./state";
import {MAX_LEVEL} from "./state";
import type {EndBattle} from "../../action/game/battle";
import type {GameOver} from "gbraver-burst-core";

/**
 * 戦闘終了に伴いゲーム情報を更新する
 *
 * @param origin 更新前の状態
 * @param action 戦闘終了アクション
 * @return 更新結果
 */
export function endBattle(origin: State, action: EndBattle): State {
  if (action.gameEnd.result.type !== 'GameOver') {
    return origin;
  }

  const gameOver: GameOver = action.gameEnd.result;
  const isPlayerLose = gameOver.winner !== origin.player.playerId;
  if (isPlayerLose) {
    return origin;
  }

  const updatedLevel = Math.min(origin.level + 1, MAX_LEVEL);
  return {
    ...origin,
    level: updatedLevel
  };
}

