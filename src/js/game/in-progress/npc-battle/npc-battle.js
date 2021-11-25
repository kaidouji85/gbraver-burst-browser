// @flow

import type {GameOver, Player} from "gbraver-burst-core";
import {ArmDozers, Pilots} from "gbraver-burst-core";
import type {SelectionComplete, EndBattle} from "../../actions/game-actions";
import type {NPCBattleStage, NPCBattleCourse} from './npc-battle-course';
import {DefaultStage, getNPCBattleCourse} from './npc-battle-course';
import {playerUuid} from "../../../uuid/player";

/** @deprecated 最大レベル */
export const MAX_LEVEL = 3;

/** プレイヤー選択 */
export type PlayerSelect = {
  type: 'PlayerSelect'
};

/** NPCバトルコース実行中 */
export type InNPCBattleCourse = {
  type: 'InNPCBattleCourse',
  /** 進行状況 */
  player: Player,
  /** コース */
  course: NPCBattleCourse,
  /** ステージレベル */
  level: number,
};

/** サブフロー */
export type SubFlow = PlayerSelect | InNPCBattleCourse;

/** NPCバトル */
export type NPCBattle = {
  type: 'NPCBattle',
  /** サブフロー */
  subFlow: SubFlow,

  /** @deprecated プレイヤー情報 */
  player: ?Player,

  /** @deprecated ゲームレベル */
  level: number
};

/**
 * NPCバトルの初期状態を生成する
 *
 * @return 生成結果
 */
export function createInitialNPCBattle(): NPCBattle {
  return {
    type: 'NPCBattle',
    subFlow: {type: 'PlayerSelect'},
    player: null,
    level: 1,
  };
}

/**
 * NPCバトルコース開始直後のサブフローを生成する
 * 
 * @param action プレイヤー選択完了アクション 
 * @return NPCバトルコース進行中のサブフロー 
 */
export function startNPCBattleCourse(action: SelectionComplete): InNPCBattleCourse {
  const armdozer = ArmDozers.find(v => v.id === action.armdozerId) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === action.pilotId) ?? Pilots[0];
  const player = {playerId: playerUuid(), armdozer, pilot};
  const course = getNPCBattleCourse(armdozer.id);
  return {type: 'InNPCBattleCourse', player, course, level: 1};
}

/**
 * プレイヤーが勝利したか否かを判定する
 * 
 * @param player プレイヤー情報
 * @param action ゲームエンドアクション
 * @return 判定結果、trueでプレイヤーの勝利
 */
export function isPlayerWin(player: Player, action: EndBattle): boolean {
  if (action.gameEnd.result.type !== 'GameOver') {
    return false;
  }
  const gameOver: GameOver = action.gameEnd.result;
  return gameOver.winner === player.playerId;
}

/**
 * NPCバトルが完了したか否かを判定する
 * 
 * @param inNPCBattleCourse NPCバトル進行中のサブフロー
 * @return 判定結果、trueでNPCバトルが完了した
 */
export function isNPCBattleCourseComplete(inNPCBattleCourse: InNPCBattleCourse): boolean {
  return inNPCBattleCourse.course.length <= inNPCBattleCourse.level;
}

/**
 * @deprecated
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
 * @deprecated
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
 * @deprecated
 * NPCルートが終了か否かを判定する
 *
 * @param state
 * @return 判定結果、trueで終了
 */
export function isNPCBattleEnd(state: NPCBattle, action: EndBattle): boolean {
  return (state.level === MAX_LEVEL) && isWin(state, action);
}

/**
 * @deprecated
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
 * @deprecated
 * NPCバトルの状態に応じたステージを検索する
 * 
 * @param npcBattle NPCバトルの状態
 * @return 検索結果
 */
export function findStage(npcBattle: NPCBattle): NPCBattleStage {
  if (!npcBattle.player) {
    return DefaultStage;
  }

  const player: Player = npcBattle.player;
  const course = getNPCBattleCourse(player.armdozer.id);
  return course.find(v => v.level === npcBattle.level) ?? DefaultStage;
}