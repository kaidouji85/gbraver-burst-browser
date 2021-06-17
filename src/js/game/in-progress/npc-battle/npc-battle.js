// @flow

import type {GameOver, Player} from "gbraver-burst-core";
import type {EndBattle} from "../../actions/game-actions";
import type {NPCBattleCourse} from './npc-battle-course';
import {DefaultCourse, NPCBattleCourses} from './npc-battle-course';

/** 最大レベル */
export const MAX_LEVEL = 3;

/**
 * NPC戦闘
 */
export type NPCBattle = {
  type: 'NPCBattle',

  /** プレイヤー情報 */
  player: ?Player,

  /** ゲームレベル */
  level: number
};

/**
 * NPC戦闘の初期状態を生成する
 *
 * @return 生成結果
 */
export function createInitialNPCBattle(): NPCBattle {
  return {
    type: 'NPCBattle',
    player: null,
    level: 1,
  };
}

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
 * 戦闘結果に応じてNPCバトルをレベルアップさせる
 * 勝った場合は+1、負けた場合は変更なし
 *
 * @param origin 更新前の状態
 * @param action アクション
 * @return 更新結果
 */
export function levelUpOrNot(origin: NPCBattle, action: EndBattle): NPCBattle {
  if (!isWin(origin, action)) {
    return origin;
  }

  const updatedLevel = Math.min(origin.level + 1, MAX_LEVEL);
  return {
    ...origin,
    level: updatedLevel
  };
}

/**
 * NPCバトルの状態に応じたステージを検索する
 * 
 * @param player プレイヤー
 * @param npcBattle NPCバトルの状態
 * @return 検索結果
 */
export function findCourse(player: Player, npcBattle: NPCBattle): NPCBattleCourse {
  return NPCBattleCourses.find(v => (v.armdozerId === player.armdozer.id) && (v.level === npcBattle.level))
    ?? DefaultCourse;
}