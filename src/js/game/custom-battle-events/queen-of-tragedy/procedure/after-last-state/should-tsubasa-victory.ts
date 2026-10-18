import { Conditions } from "./conditions";

/**
 * ツバサ勝利を再生するべきか判定する
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
export const shouldTsubasaVictory = (conditions: Conditions) =>
  conditions.gameEnd &&
  conditions.gameEnd.result.type === "GameOver" &&
  conditions.gameEnd.result.winner === conditions.enemyId;
