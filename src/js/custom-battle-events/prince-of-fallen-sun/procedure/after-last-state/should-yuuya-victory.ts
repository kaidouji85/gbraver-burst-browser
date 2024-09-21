import { Conditions } from "./conditions";

/**
 * ユウヤ勝利を再生するべきか判定する
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
export function shouldYuuyaVictory(conditions: Conditions) {
  const { gameEnd, playerId } = conditions;
  return (
    gameEnd &&
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === playerId
  );
}
