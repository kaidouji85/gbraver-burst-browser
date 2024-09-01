import { EMPTY_ARMDOZER_STATE, EMPTY_PLAYER_STATE } from "gbraver-burst-core";

import { getExtraBatteryAtTurnStart } from "../../../src/js/npc/get-extra-battery-at-turn-start";

/**
 * プレイヤーを生成する
 * @param battery バッテリー値
 * @returns 生成したプレイヤー
 */
const createPlayer = (battery: number) => ({
  ...EMPTY_PLAYER_STATE,
  armdozer: {
    ...EMPTY_ARMDOZER_STATE,
    battery,
    maxBattery: 5,
  },
});

test("ターン開始時のバッテリー回復で最大値を超えたものが余剰となる", () => {
  const player = createPlayer(4);
  // 初期値が4、回復量が3、最大値が5なので、余剰は2
  expect(getExtraBatteryAtTurnStart(player)).toBe(2);
});

test("余剰がない場合は0を返す", () => {
  const player = createPlayer(1);
  // 初期値が1、回復量が3、最大値が5なので、余剰は0
  expect(getExtraBatteryAtTurnStart(player)).toBe(0);
});

test("余剰がぴったり0の場合でも、関数は正しく0を返す", () => {
  const player = createPlayer(2);
  // 初期値が2、回復量が3、最大値が5なので、余剰は0
  expect(getExtraBatteryAtTurnStart(player)).toBe(0);
});
