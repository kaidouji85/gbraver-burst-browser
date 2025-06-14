import { EMPTY_GAME_STATE, GameState } from "gbraver-burst-core";

import { getBattleCount } from "../../../src/js/custom-battle-events/get-battle-count";

/** Battleのゲームステート */
const battle: GameState = {
  ...EMPTY_GAME_STATE,
  effect: {
    name: "Battle",
    attacker: "attacker",
    isDeath: false,
    result: {
      name: "NormalHit",
      damage: 2000,
    },
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

test("戦闘回数を正しく数えることができる", () => {
  expect(getBattleCount([other, battle, other, other, battle])).toBe(2);
});

test("ステートヒストリーにバトルがない場合は0回とみなす", () => {
  expect(getBattleCount([other, other, other, other, other])).toBe(0);
});

test("ステートヒストリーが空配列の場合は0回とみなす", () => {
  expect(getBattleCount([])).toBe(0);
});
