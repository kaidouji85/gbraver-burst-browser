import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { isEvenMatch } from "../../../src/js/custom-battle-events/is-even-match";

/**
 * プレイヤーのプレイヤーステートを生成する
 * @param hp HP、最大値である3100を超えてはならない
 * @return 生成結果
 */
const createShinya = (hp: number): PlayerState => ({
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
const createYuuya = (hp: number): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "yuuya",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp,
    maxHp: 3000,
  },
});

test("互いのHPが同じ場合、イーブンマッチであると見なす", () => {
  expect(
    isEvenMatch({
      player: createShinya(900),
      enemy: createYuuya(900),
    }),
  ).toBe(true);
});

test("互いにノーダメージの場合、イーブンマッチであると見なす", () => {
  expect(
    isEvenMatch({
      player: createShinya(3100),
      enemy: createYuuya(3000),
    }),
  ).toBe(true);
});

test("敵のHPが大きい場合、イーブンマッチでない", () => {
  expect(
    isEvenMatch({
      player: createShinya(900),
      enemy: createYuuya(3000),
    }),
  ).toBe(false);
});

test("プレイヤーのHPが大きい場合、イーブンマッチでない", () => {
  expect(
    isEvenMatch({
      player: createShinya(3100),
      enemy: createYuuya(1000),
    }),
  ).toBe(false);
});
