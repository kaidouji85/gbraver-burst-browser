import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { canBeatDown } from "../../../src/js/npc/can-beat-down";

/** 攻撃側プレイヤー */
const attacker: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    power: 2000,
    battery: 4,
    maxBattery: 5,
  },
};

/** 防御側プレイヤー */
const defender: PlayerState = {
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    hp: 2000,
    maxHp: 3100,
    battery: 2,
    maxBattery: 5,
  },
};

test("相手を倒せる場合はtrueを返す", () => {
  expect(canBeatDown(attacker, 3, defender, 2)).toBe(true);
});

test("相手が生き残る場合はfalseを返す", () => {
  expect(canBeatDown(attacker, 3, defender, 4)).toBe(false);
});
