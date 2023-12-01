import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { isShinyaAdvantage } from "../../../../../src/js/custom-battle-events/confrontation-two-braver/procedures/is-shinya-advantage";

/**
 * シンヤのプレイヤーステートを生成する
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
 * ユウヤのプレイヤーステートを生成する
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

test("シンヤのHPが大きい場合、シンヤ有利とみなす", () => {
  expect(
    isShinyaAdvantage({
      shinya: createShinya(3100),
      yuuya: createYuuya(900),
    }),
  ).toBe(true);
});

test("ユウヤのHPが大きい場合、シンヤ有利ではない", () => {
  expect(
    isShinyaAdvantage({
      shinya: createShinya(900),
      yuuya: createYuuya(3000),
    }),
  ).toBe(false);
});

test("互いがノーダメージなら、シンヤのHPが大きい場合でも、シンヤ有利ではない", () => {
  expect(
    isShinyaAdvantage({
      shinya: createShinya(3100),
      yuuya: createYuuya(3000),
    }),
  ).toBe(false);
});

test("互いのHPが同じなら、シンヤ有利ではない", () => {
  expect(
    isShinyaAdvantage({
      shinya: createShinya(900),
      yuuya: createYuuya(900),
    }),
  ).toBe(false);
});
