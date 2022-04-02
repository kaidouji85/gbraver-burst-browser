// @flow

import type {ArmDozerId, PilotId, Player} from "gbraver-burst-core";
import {ArmDozers, Pilots} from "gbraver-burst-core";
import type {NPCBattleCourse} from '../npc-battle/npc-battle-course';
import {playerUuid} from "../../uuid/player";
import type {StageLevel} from "../npc-battle/npc-battle-stage";

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
export type SubFlow = PlayerSelect | DifficultySelect | InNPCBattleCourse;

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
 * NPCバトル用のプレイヤーを生成する
 *
 * @param armdozerId プレイヤーが選択したアームドーザID
 * @param pilotId プレイヤーが選択したパイロットID
 * @return 生成したプレイヤー情報
 */
export function createNPCBattlePlayer(armdozerId: ArmDozerId, pilotId: PilotId): Player {
  const armdozer = ArmDozers.find(v => v.id === armdozerId) ?? ArmDozers[0];
  const pilot = Pilots.find(v => v.id === pilotId) ?? Pilots[0];
  return {playerId: playerUuid(), armdozer, pilot};
}

