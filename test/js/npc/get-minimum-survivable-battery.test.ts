import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { getMinimumSurvivableBattery } from "../../../src/js/npc/get-minimum-survivable-battery";

/** 防御側プレイヤー */
const defender: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 2000,
    maxHp: 3100,
    battery: 4,
    maxBattery: 5,
  },
};

/**
 * 攻撃側プレイヤーを生成する
 * @param power 攻撃
 * @returns 攻撃側プレイヤー
 */
const createAttacker = (power: number): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    power,
  },
});

test("防御して生き延びられるバッテリーをを正しく計算できる", () => {
  expect(
    getMinimumSurvivableBattery(defender, createAttacker(2000), 2),
  ).toEqual({
    isExist: true,
    value: 2,
  });
});

test("回避して生き延びられるバッテリーをを正しく計算できる", () => {
  expect(
    getMinimumSurvivableBattery(defender, createAttacker(4000), 2),
  ).toEqual({
    isExist: true,
    value: 3,
  });
});

test("相手が0攻撃の場合、0防御でも生き残れる", () => {
  expect(
    getMinimumSurvivableBattery(defender, createAttacker(4000), 0),
  ).toEqual({
    isExist: true,
    value: 0,
  });
});

test("生き延びられない場合はisExist=falseを返す", () => {
  expect(
    getMinimumSurvivableBattery(defender, createAttacker(2000), 5),
  ).toEqual({
    isExist: false,
  });
});
