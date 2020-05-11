// @flow

import type {NPCBattle} from "./npc-battle";
import type {EndBattle} from "../../../action/game/battle";
import type {GameOver, Player} from "gbraver-burst-core";
import {MAX_LEVEL} from "../state";

/**
 * 戦闘終了結果の応じてNPC戦闘を更新する
 *
 * @param origin 更新前の状態
 * @param action アクション
 * @return 更新結果
 */
export function endBattle(origin: NPCBattle, action: EndBattle) {
  if (action.gameEnd.result.type !== 'GameOver') {
    return origin;
  }
  
  if (!origin.player) {
    return origin;
  }
  const player: Player = origin.player;
  const gameOver: GameOver = action.gameEnd.result;
  const isPlayerLose = gameOver.winner !== player.playerId;
  if (isPlayerLose) {
    return origin;
  }

  const updatedLevel = Math.min(origin.level + 1, MAX_LEVEL);
  return {
    ...origin,
    level: updatedLevel
  };
}