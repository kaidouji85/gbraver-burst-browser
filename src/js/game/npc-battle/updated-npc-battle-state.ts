import { GameEndResult } from "gbraver-burst-core";

import { getCurrentNPCStage } from "./get-current-npc-stage";
import { getNPCBattleResult, NPCBattleResult } from "./npc-battle-result";
import { NPCBattleState } from "./npc-battle-state";

/** NPCバトル更新結果 */
export type UpdatedNPCBattleState = {
  /** 更新されたステート */
  state: NPCBattleState;
  /** NPCバトル結果 */
  result: NPCBattleResult;
};

/**
 * NPCバトルステートを更新する
 * @param origin 更新前のステート
 * @param gameEndResult 戦闘結果
 * @returns NPCバトル更新結果
 */
export function updateNPCBattleState(
  origin: Readonly<NPCBattleState>,
  gameEndResult: Readonly<GameEndResult>,
): UpdatedNPCBattleState | null {
  const stage = getCurrentNPCStage(origin);
  if (!stage) {
    return null;
  }

  const isStageClear =
    gameEndResult.type === "GameOver" &&
    gameEndResult.winner === origin.player.playerId;
  const isLastStage = origin.stageIndex === origin.stages.length - 1;
  const result = getNPCBattleResult(isStageClear, isLastStage);
  const nextStageIndex =
    result === "StageClear" ? origin.stageIndex + 1 : origin.stageIndex;
  const updatedState = { ...origin, stageIndex: nextStageIndex };
  return {
    state: updatedState,
    result,
  };
}
