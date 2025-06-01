import { GameState, PlayerId } from "gbraver-burst-core";
import { getMainTurnCount } from "../../../src/js/custom-battle-events/get-main-turn-count";

const playerA: PlayerId = "A" as PlayerId;
const playerB: PlayerId = "B" as PlayerId;

const makeState = (effect: any, activePlayerId: PlayerId): GameState => ({
  effect,
  activePlayerId,
  // ...他の必要なプロパティは適宜モック
} as GameState);

test("通常の交互ターンで正しくカウントされる", () => {
  const stateHistory: GameState[] = [
    makeState({ name: "StartGame" }, playerA),
    makeState({ name: "TurnChange", reason: "Normal" }, playerB),
    makeState({ name: "TurnChange", reason: "Normal" }, playerA),
    makeState({ name: "TurnChange", reason: "Normal" }, playerB),
  ];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(2);
  expect(getMainTurnCount({ stateHistory, playerId: playerB })).toBe(2);
});

test("連続行動(ContinuousActive)は1ターンとみなされる", () => {
  const stateHistory: GameState[] = [
    makeState({ name: "StartGame" }, playerA),
    makeState({ name: "TurnChange", reason: "Normal" }, playerB),
    makeState({ name: "TurnChange", reason: "Normal" }, playerA),
    makeState({ name: "TurnChange", reason: "ContinuousActive" }, playerA),
    makeState({ name: "TurnChange", reason: "Normal" }, playerB),
  ];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(2);
  expect(getMainTurnCount({ stateHistory, playerId: playerB })).toBe(2);
});

test("StartGameだけの場合は1", () => {
  const stateHistory: GameState[] = [
    makeState({ name: "StartGame" }, playerA),
  ];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(1);
  expect(getMainTurnCount({ stateHistory, playerId: playerB })).toBe(0);
});

test("Normal以外のTurnChangeはカウントされない", () => {
  const stateHistory: GameState[] = [
    makeState({ name: "StartGame" }, playerA),
    makeState({ name: "TurnChange", reason: "ContinuousActive" }, playerA),
    makeState({ name: "TurnChange", reason: "ContinuousActive" }, playerA),
  ];
  expect(getMainTurnCount({ stateHistory, playerId: playerA })).toBe(1);
});
