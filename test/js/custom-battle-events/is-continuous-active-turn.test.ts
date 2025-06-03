import { EMPTY_GAME_STATE, GameState } from "gbraver-burst-core";

import { isContinuousActiveTurn } from "../../../src/js/custom-battle-events/is-continuous-active-turn";

/** TurnStartのゲームステート */
const TURN_START: GameState = {
  ...EMPTY_GAME_STATE,
  effect: { name: "StartGame" },
};

/**
 * TurnChangeのゲームステートを生成する
 * @param reason ターン変更の理由
 * @param activePlayerId アクティブプレイヤーのID
 * @returns 生成したゲームステート
 */
const createTurnChange = (
  reason: "Normal" | "ContinuousActive",
): GameState => ({
  ...EMPTY_GAME_STATE,
  effect: { name: "TurnChange", reason, recoverBattery: 0 },
});

/** その他ゲームステート */
const OTHER_GAME_STATE: GameState = {
  ...EMPTY_GAME_STATE,
  effect: { name: "InputCommand", players: [] },
};

test("最後のTurnChangeがContinuousActiveならtrue", () => {
  const stateHistory: GameState[] = [
    TURN_START,
    createTurnChange("Normal"),
    createTurnChange("ContinuousActive"),
  ];
  expect(isContinuousActiveTurn(stateHistory)).toBe(true);
});

test("最後のTurnChangeがNormalならfalse", () => {
  const stateHistory: GameState[] = [
    TURN_START,
    createTurnChange("ContinuousActive"),
    createTurnChange("Normal"),
  ];
  expect(isContinuousActiveTurn(stateHistory)).toBe(false);
});

test("TurnChangeが存在しない場合はfalse", () => {
  const stateHistory: GameState[] = [TURN_START, OTHER_GAME_STATE];
  expect(isContinuousActiveTurn(stateHistory)).toBe(false);
});

test("TurnChangeが複数あっても最後のものを判定する", () => {
  const stateHistory: GameState[] = [
    TURN_START,
    createTurnChange("Normal"),
    createTurnChange("ContinuousActive"),
    createTurnChange("Normal"),
    createTurnChange("ContinuousActive"),
  ];
  expect(isContinuousActiveTurn(stateHistory)).toBe(true);
});

test("最後のTurnChangeの後にOTHER_GAME_STATEがあっても判定に影響しない", () => {
  const stateHistory: GameState[] = [
    TURN_START,
    createTurnChange("Normal"),
    createTurnChange("ContinuousActive"),
    OTHER_GAME_STATE,
  ];
  expect(isContinuousActiveTurn(stateHistory)).toBe(true);
});
