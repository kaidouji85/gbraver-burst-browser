import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { isPlayerAdvantage } from "../../../src/js/custom-battle-events/is-player-advantage";

/**
 * プレイヤーのプレイヤーステートを生成する
 * @param hp HP、最大値である3100を超えてはならない
 * @return 生成結果
 */
const createPlayer = (hp: number): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "shinya",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp,
    maxHp: 3100,
  },
});

/**
 * 敵のプレイヤーステートを生成する
 * @param hp HP、最大値である3000を超えてはならない
 * @return 生成結果
 */
const createEnemy = (hp: number): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "yuuya",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp,
    maxHp: 3000,
  },
});

test("プレイヤーのHPが大きい場合、プレイヤー有利とみなす", () => {
  expect(
    isPlayerAdvantage({
      player: createPlayer(3100),
      enemy: createEnemy(900),
    }),
  ).toBe(true);
});

test("敵のHPが大きい場合、 プレイヤー有利ではない", () => {
  expect(
    isPlayerAdvantage({
      player: createPlayer(900),
      enemy: createEnemy(3000),
    }),
  ).toBe(false);
});

test("互いがノーダメージなら、プレイヤーのHPが大きい場合でも、プレイヤー有利ではない", () => {
  expect(
    isPlayerAdvantage({
      player: createPlayer(3100),
      enemy: createEnemy(3000),
    }),
  ).toBe(false);
});

test("互いのHPが同じなら、プレイヤー有利ではない", () => {
  expect(
    isPlayerAdvantage({
      player: createPlayer(900),
      enemy: createEnemy(900),
    }),
  ).toBe(false);
});
