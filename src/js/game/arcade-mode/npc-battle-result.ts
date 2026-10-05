import { GameEndResult } from "gbraver-burst-core";

import { NPCBattleState } from "./npc-battle-state";

/** NPCバトル結果 */
export type NPCBattleResult = "StageClear" | "StageMiss" | "NPCBattleComplete";

/**
 * NPCバトル結果を求める
 * @param origin 更新前のステート
 * @param gameEndResult 戦闘結果
 * @returns 判定結果
 */
export function getNPCBattleResult(
  origin: Readonly<NPCBattleState>,
  gameEndResult: Readonly<GameEndResult>,
): NPCBattleResult {
  const isStageClear =
    gameEndResult.type === "GameOver" &&
    gameEndResult.winner === origin.player.playerId;
  const isLastStage = origin.stageIndex === origin.stages.length - 1;

  let result: NPCBattleResult = "StageMiss";
  if (isStageClear && isLastStage) {
    result = "NPCBattleComplete";
  } else if (isStageClear && !isLastStage) {
    result = "StageClear";
  }

  return result;
}
