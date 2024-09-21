import { GameState, PlayerId } from "gbraver-burst-core";

/**
 * ステートヒストリーに攻撃ヒットが含まれるかを判定する
 * @param stateHistory ステートヒストリー
 * @param playerId トドメの一撃を放ったプレイヤーID
 * @returns トドメの一撃が含まれる場合true、そうでない場合false
 */
export function hasNormalHit(
  stateHistory: GameState[],
  playerId: PlayerId,
): boolean {
  return stateHistory.some(
    (state) =>
      state.effect.name === "Battle" &&
      state.effect.attacker === playerId &&
      state.effect.result.name === "NormalHit",
  );
}
