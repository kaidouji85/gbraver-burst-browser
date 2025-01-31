import { NPCBattleResult } from "./npc-battle-result";
import { NPCBattleState } from "./npc-battle-state";

/**
 * NPCバトルステートを更新する
 * @param origin 更新前のステート
 * @param npcBattleResult NPCバトル結果
 * @returns 更新後のステート
 */
export function updateNPCBattleState(
  origin: Readonly<NPCBattleState>,
  result: NPCBattleResult,
): NPCBattleState {
  const nextStageIndex =
    result === "StageClear" ? origin.stageIndex + 1 : origin.stageIndex;
  return { ...origin, stageIndex: nextStageIndex };
}
