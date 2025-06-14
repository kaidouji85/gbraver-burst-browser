import { EMPTY_GAME_STATE, GameState } from "gbraver-burst-core";

import { turnCount } from "../../../src/js/custom-battle-events/turn-count";

/** TurnChangeのゲームステート */
const turnChange: GameState = {
  ...EMPTY_GAME_STATE,
  effect: {
    name: "TurnChange",
    recoverBattery: 3,
    reason: "Normal",
  },
};

/** それ以外のゲームステート */
const other: GameState = {
  ...EMPTY_GAME_STATE,
  effect: {
    name: "InputCommand",
    players: [],
  },
};

test("ターン数を正しく数えられる", () => {
  expect(turnCount([turnChange, other, other, turnChange])).toBe(3);
});

test("TurnChangeが1回もない場合は、1ターンとみなす", () => {
  expect(turnCount([other, other])).toBe(1);
});

test("ステートヒストリーが空配列の場合は、1ターンとみなす", () => {
  expect(turnCount([])).toBe(1);
});
