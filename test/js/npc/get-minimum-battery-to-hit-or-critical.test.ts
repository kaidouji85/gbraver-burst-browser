import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { getMinimumBatteryToHitOrCritical } from "../../../src/js/npc/get-minimum-battery-to-hit-or-critical";

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

test("ヒットする最小バッテリーを正しく計算できる", () => {
  expect(getMinimumBatteryToHitOrCritical(attacker, defender, 2)).toEqual({
    isExist: true,
    value: 3,
  });
});

test("クリティカルする最小バッテリーを正しく計算できる", () => {
  expect(getMinimumBatteryToHitOrCritical(attacker, defender, 0)).toEqual({
    isExist: true,
    value: 1,
  });
});

test("ヒット、クリティカルできない場合はisExist=falseを返す", () => {
  expect(getMinimumBatteryToHitOrCritical(attacker, defender, 5)).toEqual({
    isExist: false,
  });
});
