import { Conditions } from "./conditions";

/**
 * ユウヤの完全勝利を再生するべきか判定する
 * @param conditions 条件オブジェクト
 * @returns 再生するべきならtrue
 */
export function shouldPerfectVictory(conditions: Conditions) {
  const { gameEnd, playerId, player } = conditions;
  return (
    gameEnd &&
    gameEnd.result.type === "GameOver" &&
    gameEnd.result.winner === playerId &&
    player &&
    player.armdozer.hp === player.armdozer.maxHp
  );
}
