import { NPCBattleState } from "./npc-battle-state";
import { NPCBattleStage } from "./stages/npc-battle-stage";

/**
 * 現在のNPCステージを取得する
 * ステージが取得できない場合はnullを返す
 *
 * @param origin NPCバトルステート
 * @returns ステージ
 */
export function getCurrentNPCStage(
  origin: NPCBattleState,
): NPCBattleStage | null | undefined {
  return origin.stages[origin.stageIndex] ?? null;
}
