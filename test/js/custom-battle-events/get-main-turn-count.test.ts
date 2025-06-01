import { EMPTY_GAME_STATE, GameState, PlayerId } from "gbraver-burst-core";

import { getMainTurnCount } from "../../../src/js/custom-battle-events/get-main-turn-count";

/** プレイヤーAのID */
const playerA: PlayerId = "playerA";

/** プレイヤーBのID */
const playerB: PlayerId = "playerB";

/**
 * TurnStartのゲームステートを生成する
 * @param activePlayerId プレイヤーID
 * @returns 生成したゲームステート
 */
const createStartGame = (activePlayerId: PlayerId): GameState => ({
  ...EMPTY_GAME_STATE,
  effect: { name: "StartGame" },
  activePlayerId,
});

/**
 * TurnChangeのゲームステートを生成する
 * @param reason ターン変更の理由
 * @param activePlayerId アクティブプレイヤーのID
 * @returns 生成したゲームステート
 */
const createTurnChange = (
  reason: "Normal" | "ContinuousActive",
  activePlayerId: PlayerId,
): GameState => ({
  ...EMPTY_GAME_STATE,
  effect: { name: "TurnChange", reason, recoverBattery: 0 },
  activePlayerId,
});

test("通常の交互ターンで正しくカウントされる", () => {
  const stateHistory: GameState[] = [
    createStartGame(playerA),
    createTurnChange("Normal", playerB),
    createTurnChange("Normal", playerA),
    createTurnChange("Normal", playerB),
  ];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(2);
  expect(getMainTurnCount({ stateHistory, playerId: playerB })).toBe(2);
});

test("連続行動(ContinuousActive)は1ターンとみなされる", () => {
  const stateHistory: GameState[] = [
    createStartGame(playerA),
    createTurnChange("Normal", playerB),
    createTurnChange("Normal", playerA),
    createTurnChange("ContinuousActive", playerA),
    createTurnChange("Normal", playerB),
  ];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(2);
  expect(getMainTurnCount({ stateHistory, playerId: playerB })).toBe(2);
});

test("StartGameだけの場合は1", () => {
  const stateHistory: GameState[] = [createStartGame(playerA)];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(1);
  expect(getMainTurnCount({ stateHistory, playerId: playerB })).toBe(0);
});

test("Normal以外のTurnChangeはカウントされない", () => {
  const stateHistory: GameState[] = [
    createStartGame(playerA),
    createTurnChange("ContinuousActive", playerA),
    createTurnChange("ContinuousActive", playerA),
  ];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(1);
});
