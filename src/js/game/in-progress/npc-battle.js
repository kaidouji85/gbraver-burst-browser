// @flow
import type {ArmDozerId, PilotId} from "gbraver-burst-core";
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

/** NPCバトルプレイ中 */
export type PlayingNPCBattle = {
  type: 'PlayingNPCBattle',
  state: NPCBattleState,
};

/** サブフロー */
export type SubFlow = PlayerSelect | DifficultySelect | PlayingNPCBattle;

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