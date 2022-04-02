// @flow

import type {ArmDozerId, PilotId, Player} from "gbraver-burst-core";
import type {NPCBattleCourse} from '../npc-battle/npc-battle-course';
import type {NPCBattleState} from "../npc-battle";

/** プレイヤー選択 */
export type PlayerSelect = {
  type: 'PlayerSelect'
};

/** 難易度選択 */
export type DifficultySelect = {
  type: 'DifficultySelect',
  /** 選択したアームドーザ */
  armdozerId: ArmDozerId,
  /** 選択したパイロット */
  pilotId: PilotId
};

/** @deprecated NPCバトルコース実行中 */
export type InNPCBattleCourse = {
  type: 'InNPCBattleCourse',
  /** 進行状況 */
  player: Player,
  /** コース */
  course: NPCBattleCourse,
  /** 現在のステージレベル */
  level: number,
};

/** NPCバトルプレイ中 */
export type PlayingNPCBattle = {
  type: 'PlayingNPCBattle',
  state: NPCBattleState,
};

/** サブフロー */
export type SubFlow = PlayerSelect | DifficultySelect | InNPCBattleCourse | PlayingNPCBattle;

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