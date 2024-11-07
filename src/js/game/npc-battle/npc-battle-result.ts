/** NPCバトル結果 */
export type NPCBattleResult = "StageClear" | "StageMiss" | "NPCBattleComplete";

/**
 * NPCバトル結果を求める
 * @param isStageClear ステージクリアしたか否かのフラグ、trueでステージクリア
 * @param isLastStage ラストステージか否かのフラグ、trueでラストステージ
 * @returns 判定結果
 */
export function getNPCBattleResult(
  isStageClear: boolean,
  isLastStage: boolean,
): NPCBattleResult {
  if (isStageClear && isLastStage) {
    return "NPCBattleComplete";
  } else if (isStageClear && !isLastStage) {
    return "StageClear";
  }

  return "StageMiss";
}
