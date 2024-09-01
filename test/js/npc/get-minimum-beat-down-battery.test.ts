import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { getMinimumBeatDownBattery } from "../../../src/js/npc/get-minimum-beat-down-battery";

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
    hp: 2100,
    maxHp: 3100,
    battery: 2,
    maxBattery: 5,
  },
};

test("相手を倒せる最小限のバッテリーを正しく計算できる", () => {
  expect(getMinimumBeatDownBattery(attacker, defender, 2)).toEqual({
    isExist: true,
    value: 4,
  });
});

test("相手を倒せない場合はisExist=falseを返す", () => {
  expect(getMinimumBeatDownBattery(attacker, defender, 5)).toEqual({
    isExist: false,
  });
});
