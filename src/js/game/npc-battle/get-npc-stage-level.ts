import { NPCBattleState } from "./npc-battle-state";

/**
 * 現在のNPCステージレベルを取得する
 * @param state NPCバトルステート
 * @returns ステージレベル
 */
export function getNPCStageLevel(state: NPCBattleState): number {
  return state.stageIndex + 1;
}
