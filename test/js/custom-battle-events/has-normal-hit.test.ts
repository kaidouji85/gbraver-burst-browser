import {
  Battle,
  BattleResult,
  EMPTY_GAME_STATE,
  GameState,
  GameStateX,
  Guard,
  NormalHit,
  PlayerId,
} from "gbraver-burst-core";

import { hasNormalHit } from "../../../src/js/custom-battle-events/has-normal-hit";

/**
 * Battleのゲームステートを生成する
 * @param attacker 攻撃側プレイヤーID
 * @param result 戦闘結果
 * @returns Battleのゲームステート
 */
const createBattle = (
  attacker: PlayerId,
  result: BattleResult,
): GameStateX<Battle> => ({
  ...EMPTY_GAME_STATE,
  effect: {
    name: "Battle",
    isDeath: false,
    attacker,
    result,
  },
});

/** 通常ヒット */
const normalHit: NormalHit = { name: "NormalHit", damage: 2000 };

/** 通常ヒット以外 */
const otherThanNormalHit: Guard = { name: "Guard", damage: 1000 };

/** それ以外のゲームステート */
const otherGameState: GameState = {
  ...EMPTY_GAME_STATE,
  effect: {
    name: "InputCommand",
    players: [],
  },
};

test("指定されたプレイヤーの通常ヒットが含まれていればtrueを返す", () => {
  expect(
    hasNormalHit([createBattle("test-player", normalHit)], "test-player"),
  ).toBe(true);
});

test("指定されたプレイヤーの通常ヒットでなければfalseを返す", () => {
  expect(
    hasNormalHit([createBattle("test-player", normalHit)], "not-test-player"),
  ).toBe(false);
});

test("ノーマルヒット以外のバトルならfalseを返す", () => {
  expect(
    hasNormalHit(
      [createBattle("test-player", otherThanNormalHit)],
      "test-player",
    ),
  ).toBe(false);
});

test("バトル以外のゲームステートならfalseを返す", () => {
  expect(
    hasNormalHit(
      [createBattle("test-player", otherThanNormalHit)],
      "test-player",
    ),
  ).toBe(false);
});

test("ステート履歴が空ならfalseを返す", () => {
  expect(hasNormalHit([], "test-player")).toBe(false);
});
