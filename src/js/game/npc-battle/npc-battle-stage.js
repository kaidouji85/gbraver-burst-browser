// @flow

import {burstNeoLandozer} from "../../npc/burst-neo-landozer";
import type {NPC} from "../../npc/npc";

/**
 * ステージレベル
 * 1から始まり+1間隔で増える
 */
export type StageLevel = number

/** NPCバトル開始時のステージレベル */
export const INITIAL_STAGE_LEVEL = 1;

/** NPCバトル ステージ */
export type NPCBattleStage = {
  /** ステージ名 */
  caption: string[],
  /** 対戦相手 */
  npc: NPC
};

/** デフォルトのステージ */
export const DefaultStage: NPCBattleStage = {
  caption: ['敵よりも大きい', 'バッテリーを出せ'],
  npc: burstNeoLandozer()
};