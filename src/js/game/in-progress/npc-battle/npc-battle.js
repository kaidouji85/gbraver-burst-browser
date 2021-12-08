// @flow

import type {GameEndResult, Player} from "gbraver-burst-core";
import {ArmDozers, Pilots} from "gbraver-burst-core";
import type {SelectionComplete} from "../../actions/game-actions";
import type {StageLevel, NPCBattleCourse} from '../../npc-battle/npc-battle-course';
import {getNPCBattleCourse} from '../../npc-battle/npc-battle-course';
import {playerUuid} from "../../../uuid/player";

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
  /** 現在のステージレベル */
  level: StageLevel,
};

/** サブフロー */
export type SubFlow = PlayerSelect | InNPCBattleCourse;

/** 
 * NPCバトル
 * @template X サブフローのデータ型
 */
export type NPCBattleX<X> = {
  type: 'NPCBattle',
  /** サブフロー */
  subFlow: X
}

/** NPCバトル */
export type NPCBattle = NPCBattleX<SubFlow>;

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
 * ステージクリアしたか否かを判定する
 * 
 * @param player プレイヤー情報
 * @param gameEndResult ゲームエンド結果
 * @return 判定結果、trueでステージクリアである
 */
export function isStageClear(player: Player, gameEndResult: GameEndResult): boolean {
  return gameEndResult.type === 'GameOver' && gameEndResult.winner === player.playerId;
}