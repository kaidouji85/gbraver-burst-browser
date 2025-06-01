import { GameState, PlayerId } from "gbraver-burst-core";

/**
 * 指定したプレイヤーのメインターン数を取得する
 * 「メインターン」とは、連続攻撃など同一プレイヤーが連続して攻撃をした場合に
 * それを1ターンとカウントするものである。
 * たとえば、
 * 
 *   - StarGame プレイヤーA
 *   - TurnChange プレイヤーB
 *   - TurnChange プレイヤーA
 *   - プレイヤーAに2回行動が適用された
 *   - TurnChange プレイヤーA
 *   - TurnChange プレイヤーB
 * 
 * となった場合、プレイヤーAのメインターン数は2となる。
 * 
 * ※TurnChangeのreasonについて:
 *   - "Normal" はプレイヤーが交互にターン変更されている場合
 *   - "ContinuousActive" は同じプレイヤーが連続してターン変更している場合（2回行動など）
 * 今回はNormalのみを数えることで、連続行動を1ターンとみなす仕様となっている。
 * 
 * @param options オプション
 * @returns メインターン数
 */
export const getMainTurnCount = (options: {
  stateHistory: GameState[];
  playerId: PlayerId;
}): number => {
  const { stateHistory, playerId } = options;
  const isPlayerStartingGame = (state: GameState) =>
    state.effect.name === "StartGame" && state.activePlayerId === playerId;
  const isPlayerNormalTurnChange = (state: GameState) =>
    state.effect.name === "TurnChange" &&
    state.effect.reason === "Normal" &&
    state.activePlayerId === playerId;
  return stateHistory.filter(
    (s) => isPlayerStartingGame(s) || isPlayerNormalTurnChange(s),
  ).length;
};
