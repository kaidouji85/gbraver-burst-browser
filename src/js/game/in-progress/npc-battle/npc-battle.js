// @flow

import type {GameOver, Player} from "gbraver-burst-core";
import {ArmDozers, Pilots} from "gbraver-burst-core";
import type {SelectionComplete, EndBattle} from "../../actions/game-actions";
import type {NPCBattleCourse} from './npc-battle-course';
import {DefaultCourse, NPCBattleCourses} from './npc-battle-course';
import {playerUuid} from "../../../uuid/player";

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
 * プレイヤー選択結果からNPCバトル用プレイヤーを生成する
 * 
 * @param action プレイヤー選択結果
 * @return NPCバトル用プレイヤー
 */
export function createNPCBattlePlayer(action: SelectionComplete): Player {
  const armdozer = ArmDozers.find(v => v.id === action.armdozerId) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === action.pilotId) ?? Pilots[0];
  return {playerId: playerUuid(), armdozer, pilot};
}

/**
 * NPCバトルの状態に応じたステージを検索する
 * 
 * @param npcBattle NPCバトルの状態
 * @return 検索結果
 */
export function findCourse(npcBattle: NPCBattle): NPCBattleCourse {
  if (!npcBattle.player) {
    return DefaultCourse;
  }

  const player: Player = npcBattle.player;
  return NPCBattleCourses.find(v => (v.armdozerId === player.armdozer.id) && (v.level === npcBattle.level))
    ?? DefaultCourse;
}