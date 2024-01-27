import { EMPTY_ARMDOZER_STATE, EMPTY_PLAYER_STATE } from "gbraver-burst-core";

import { isZeroDefenseButBatteryPositive } from "../../../src/js/custom-battle-events/is-zero-defense-but-battery-positive";

/** 攻撃側プレイヤー */
const attacker = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
};

/**
 * 防御側プレイヤーを生成する
 * @param battery 防御側バッテリー
 * @return 防御側プレイヤー
 */
const createDefender = (battery: number) => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
  },
});

/** 防御側系プロパティを取り除いたバッテリー宣言 */
const partialBatteryDeclaration = {
  name: "BatteryDeclaration",
  attacker: "attacker",
  attackerBattery: 3,
  originalBatteryOfAttacker: 3,
} as const;

test("バッテリーが残っているのに0防御したことを正しく判定できる", () => {
  const defender = createDefender(2);
  expect(
    isZeroDefenseButBatteryPositive({
      activePlayerId: attacker.playerId,
      players: [attacker, defender],
      effect: {
        ...partialBatteryDeclaration,
        defenderBattery: 0,
        originalBatteryOfDefender: 0,
      },
    }),
  ).toBe(true);
});

test("バッテリー0で0防御したならfalseを返す", () => {
  const defender = createDefender(0);
  expect(
    isZeroDefenseButBatteryPositive({
      activePlayerId: attacker.playerId,
      players: [attacker, defender],
      effect: {
        ...partialBatteryDeclaration,
        defenderBattery: 0,
        originalBatteryOfDefender: 0,
      },
    }),
  ).toBe(false);
});

test("0より大きいバッテリーを出したらfalseを返す", () => {
  const defender = createDefender(2);
  expect(
    isZeroDefenseButBatteryPositive({
      activePlayerId: attacker.playerId,
      players: [attacker, defender],
      effect: {
        ...partialBatteryDeclaration,
        defenderBattery: 1,
        originalBatteryOfDefender: 1,
      },
    }),
  ).toBe(false);
});
