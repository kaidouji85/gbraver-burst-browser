import {
  EMPTY_ARMDOZER_STATE,
  EMPTY_PLAYER_STATE,
  PlayerState,
} from "gbraver-burst-core";

import { getOptimalDefenseBattery } from "../../../src/js/npc/get-optimal-defense-battery";

/**
 * モックプレイヤーステートを生成する
 * @param options テストプレイヤーのパラメータ
 * @returns モックプレイヤーステート
 */
const createMockPlayerState = (options: {
  /** バッテリー */
  battery: number;
  /** バッテリー自動回復 */
  batteryAutoRecovery: number;
  /** 最大バッテリー */
  maxBattery: number;
}): PlayerState => ({
  ...EMPTY_PLAYER_STATE,
  armdozer: { ...EMPTY_ARMDOZER_STATE, ...options },
});

test("バッテリー値が正の場合、最低限出すべきバッテリーが存在する", () => {
  const defender = createMockPlayerState({
    battery: 4,
    batteryAutoRecovery: 3,
    maxBattery: 5,
  });
  const result = getOptimalDefenseBattery(defender);

  // バッテリー値: 4 + 3 - 5 = 2
  expect(result).toEqual({ isExist: true, value: 2 });
});

test("バッテリー値が0の場合、最低限出すべきバッテリーが存在しない", () => {
  const defender = createMockPlayerState({
    battery: 2,
    batteryAutoRecovery: 3,
    maxBattery: 5,
  });
  const result = getOptimalDefenseBattery(defender);

  // バッテリー値: 2 + 3 - 5 = 0
  expect(result).toEqual({ isExist: false });
});

test("バッテリー値が負の場合、最低限出すべきバッテリーが存在しない", () => {
  const defender = createMockPlayerState({
    battery: 1,
    batteryAutoRecovery: 2,
    maxBattery: 5,
  });
  const result = getOptimalDefenseBattery(defender);

  // バッテリー値: 1 + 2 - 5 = -2
  expect(result).toEqual({ isExist: false });
});

test("バッテリー自動回復が0の場合は、最低限出すべきバッテリーは存在しない", () => {
  const defender = createMockPlayerState({
    battery: 5,
    batteryAutoRecovery: 0,
    maxBattery: 5,
  });
  const result = getOptimalDefenseBattery(defender);

  // バッテリー値: 5 + 0 - 5 = 0
  expect(result).toEqual({ isExist: false });
});

test("すべてのバッテリー値が0の場合", () => {
  const defender = createMockPlayerState({
    battery: 0,
    batteryAutoRecovery: 0,
    maxBattery: 5,
  });
  const result = getOptimalDefenseBattery(defender);

  // バッテリー値: 0 + 0 - 5 = -5
  expect(result).toEqual({ isExist: false });
});

test("大きな数値での計算（スケール外）", () => {
  const defender = createMockPlayerState({
    battery: 5,
    batteryAutoRecovery: 10,
    maxBattery: 5,
  });
  const result = getOptimalDefenseBattery(defender);

  // バッテリー値: 5 + 10 - 5 = 10
  expect(result).toEqual({ isExist: true, value: 10 });
});
