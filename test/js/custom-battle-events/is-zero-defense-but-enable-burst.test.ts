import { EMPTY_ARMDOZER_STATE, EMPTY_PLAYER_STATE } from "gbraver-burst-core";

import { isZeroDefenseButEnableBurst } from "../../../src/js/custom-battle-events/is-zero-defense-but-enable-burst";

/** 攻撃側プレイヤー */
const attacker = {
  ...EMPTY_PLAYER_STATE,
  playerId: "attacker",
};

/**
 * 防御側プレイヤーを生成する
 * @param enableBurst バースト発動可能か否か、trueでバースト発動可能
 * @returns 防御側プレイヤー
 */
const createDefender = (enableBurst: boolean) => ({
  ...EMPTY_PLAYER_STATE,
  playerId: "defender",
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    enableBurst,
  },
});

/** 防御側系プロパティを取り除いたバッテリー宣言 */
const partialBatteryDeclaration = {
  name: "BatteryDeclaration",
  attacker: "attacker",
  attackerBattery: 3,
  originalBatteryOfAttacker: 3,
} as const;

test("バーストが使えるのに0防御したことを正しく判定できる", () => {
  const defender = createDefender(true);
  expect(
    isZeroDefenseButEnableBurst({
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

test("バーストが使えない状態で0防御したらfalseを返す", () => {
  const defender = createDefender(false);
  expect(
    isZeroDefenseButEnableBurst({
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

test("バーストが使る状態で0より大きい防御をしたら、falseを返す", () => {
  const defender = createDefender(true);
  expect(
    isZeroDefenseButEnableBurst({
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

test("バーストが使ない状態で0より大きい防御をしたら、falseを返す", () => {
  const defender = createDefender(false);
  expect(
    isZeroDefenseButEnableBurst({
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
