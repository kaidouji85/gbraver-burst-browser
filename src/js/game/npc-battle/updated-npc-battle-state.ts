import { NPCBattleResult } from "./npc-battle-result";
import { NPCBattleState } from "./npc-battle-state";

/** NPCバトル更新結果 */
export type UpdatedNPCBattleState = {
  /** 更新されたステート */
  readonly state: NPCBattleState;
  /** NPCバトル結果 */
  readonly result: NPCBattleResult;
};

/**
 * NPCバトルステートを更新する
 * @param origin 更新前のステート
 * @param npcBattleResult NPCバトル結果
 * @returns NPCバトル更新結果
 */
export function updateNPCBattleState(
  origin: Readonly<NPCBattleState>,
  result: NPCBattleResult,
): UpdatedNPCBattleState | null {
  const nextStageIndex =
    result === "StageClear" ? origin.stageIndex + 1 : origin.stageIndex;
  const state = { ...origin, stageIndex: nextStageIndex };
  return { state, result };
}
