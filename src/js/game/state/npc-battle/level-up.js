// @flow

import type {NPCBattle} from "./npc-battle";
import {MAX_LEVEL} from "./npc-battle";
import type {GameOver, Player} from "gbraver-burst-core";
import type {EndBattle} from "../../actions/actions";

/**
 * プレイヤーが勝利したか否かを判定する
 *
 * @param state NPCバトル
 * @param action アクション
 * @return 判定結果、trueで勝利
 */
export function isWin(state: NPCBattle, action: EndBattle): boolean {
  if (action.gameEnd.result.type !== 'GameOver') {
    return false;
  }
  const gameOver: GameOver = action.gameEnd.result;

  if (!state.player) {
    return false;
  }
  const player: Player = state.player;

  return gameOver.winner === player.playerId;
}

/**
 * NPCルートが終了か否かを判定する
 *
 * @param state
 * @return 判定結果、trueで終了
 */
export function isNPCBattleEnd(state: NPCBattle, action: EndBattle): boolean {
  return (state.level === MAX_LEVEL) && isWin(state, action);
}

/**
 * 戦闘終了結果の応じてNPCレベルをアップさせる
 *
 * @param origin 更新前の状態
 * @param action アクション
 * @return 更新結果
 */
export function levelUp(origin: NPCBattle, action: EndBattle): NPCBattle {
  if (!isWin(origin, action)) {
    return origin;
  }

  const updatedLevel = Math.min(origin.level + 1, MAX_LEVEL);
  return {
    ...origin,
    level: updatedLevel
  };
}
