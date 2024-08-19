import { Conditions } from "./conditions";

/**
 * ガイ勝利を再生するべきか判定する
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
export function shouldGaiVictory(conditions: Conditions) {
  const { gameEnd, enemyId } = conditions;
  return (
    gameEnd &&
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === enemyId
  );
}
