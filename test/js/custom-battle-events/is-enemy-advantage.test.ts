import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { isEnemyAdvantage } from "../../../src/js/custom-battle-events/is-enemy-advantage";

/**
 * プレイヤーのプレイヤーステートを生成する
 * @param hp HP、最大値である3100を超えてはならない
 * @returns 生成結果
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
 * @returns 生成結果
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

test("敵のHPが大きい場合、敵有利とみなす", () => {
  expect(
    isEnemyAdvantage({
      player: createPlayer(900),
      enemy: createEnemy(3000),
    }),
  ).toBe(true);
});

test("プレイヤーのHPが大きい場合、敵有利ではない", () => {
  expect(
    isEnemyAdvantage({
      player: createPlayer(3100),
      enemy: createEnemy(1000),
    }),
  ).toBe(false);
});

test("互いにノーダメージの場合、敵有利ではない", () => {
  expect(
    isEnemyAdvantage({
      player: createPlayer(3100),
      enemy: createEnemy(3000),
    }),
  ).toBe(false);
});

test("互いのHPが同じ場合、敵有利ではない", () => {
  expect(
    isEnemyAdvantage({
      player: createPlayer(900),
      enemy: createEnemy(900),
    }),
  ).toBe(false);
});
