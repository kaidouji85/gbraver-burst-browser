import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { isYuuyaAdvantage } from "../../../../../src/js/custom-battle-events/confrontation-two-braver/procedures/is-yuuya-advantage";

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

test("ユウヤのHPが大きい場合、ユウヤ有利とみなす", () => {
  expect(
    isYuuyaAdvantage({
      shinya: createShinya(900),
      yuuya: createYuuya(3000),
    }),
  ).toBe(true);
});

test("シンヤのHPが大きい場合、ユウヤ有利ではない", () => {
  expect(
    isYuuyaAdvantage({
      shinya: createShinya(3100),
      yuuya: createYuuya(1000),
    }),
  ).toBe(false);
});

test("互いにノーダメージの場合、ユウヤ有利ではない", () => {
  expect(
    isYuuyaAdvantage({
      shinya: createShinya(3100),
      yuuya: createYuuya(3000),
    }),
  ).toBe(false);
});

test("互いのHPが同じ場合、ユウヤ有利ではない", () => {
  expect(
    isYuuyaAdvantage({
      shinya: createShinya(900),
      yuuya: createYuuya(900),
    }),
  ).toBe(false);
});
