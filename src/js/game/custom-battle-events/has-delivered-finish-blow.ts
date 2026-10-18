import { GameState, PlayerId } from "gbraver-burst-core";

/**
 * ステートヒストリーにトドメの一撃が含まれるかを判定する
 * @param stateHistory ステートヒストリー
 * @param playerId トドメの一撃を放ったプレイヤーID
 * @returns トドメの一撃が含まれる場合true、そうでない場合false
 */
export function hasDeliveredFinishBlow(
  stateHistory: GameState[],
  playerId: PlayerId,
): boolean {
  return stateHistory.some(
    (state) =>
      state.effect.name === "Battle" &&
      state.effect.attacker === playerId &&
      state.effect.isDeath,
  );
}
