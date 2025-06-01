import { GameState, PlayerId } from "gbraver-burst-core";

export const getMainActionCount = (options: {
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
