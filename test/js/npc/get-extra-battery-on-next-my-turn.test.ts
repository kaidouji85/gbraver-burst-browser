import { EMPTY_ARMDOZER_STATE, EMPTY_PLAYER_STATE } from "gbraver-burst-core";

import { getExtraBatteryOnNextMyTurn } from "../../../src/js/npc/get-extra-battery-on-next-my-turn";

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
  expect(getExtraBatteryOnNextMyTurn(player)).toBe(2);
});

test("余剰がない場合は0を返す", () => {
  const player = createPlayer(1);
  expect(getExtraBatteryOnNextMyTurn(player)).toBe(0);
});

test("余剰がぴったり0の場合でも、関数は正しく0を返す", () => {
  const player = createPlayer(2);
  expect(getExtraBatteryOnNextMyTurn(player)).toBe(0);
});
