import { ArmdozerId, PilotId } from "gbraver-burst-core";

import { NPCBattleState } from "../npc-battle/npc-battle";

/** プレイヤー選択 */
export type PlayerSelect = {
  type: "PlayerSelect";
};

/** 難易度選択 */
export type DifficultySelect = {
  type: "DifficultySelect";
  /** 選択したアームドーザ */
  readonly armdozerId: ArmdozerId;
  /** 選択したパイロット */
  readonly pilotId: PilotId;
};

/** NPCバトルプレイ中 */
export type PlayingNPCBattle = {
  type: "PlayingNPCBattle";
  readonly state: NPCBattleState;
};

/** NPCバトルのサブフロー */
export type NPCBattleSubFlow =
  | PlayerSelect
  | DifficultySelect
  | PlayingNPCBattle;

/**
 * NPCバトル
 * @template X サブフローのデータ型
 */
export type NPCBattleX<X> = {
  type: "NPCBattle";
  /** サブフロー */
  readonly npcBattle: X;
};

/** NPCバトル */
export type NPCBattle = NPCBattleX<NPCBattleSubFlow>;
