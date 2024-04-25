import { PlayerState } from "gbraver-burst-core";
import * as R from "ramda";

import { canBeatDown } from "./can-beat-down";

/** 最小バッテリーが存在する */
type Exist = {
  isExist: true;
  /** バッテリー値 */
  value: number;
};

/** 最小バッテリーが存在しない */
type NotExist = {
  isExist: false;
};

/** 結果 */
type Result = Exist | NotExist;

/**
 * 相手を倒せる最低限のバッテリーを取得する
 * @param attacker 攻撃側ステータス
 * @param defender 防御側ステータス
 * @param defenderBattery 防御側バッテリー
 * @returns 計算結果
 */
export function getMinimumBeatDownBattery(
  attacker: PlayerState,
  defender: PlayerState,
  defenderBattery: number,
): Result {
  const attackerBatteries = R.range(1, attacker.armdozer.battery + 1);
  const beatDownBatteries = attackerBatteries.filter((battery) =>
    canBeatDown(attacker, battery, defender, defenderBattery),
  );
  return 0 < beatDownBatteries.length
    ? { isExist: true, value: Math.min(...beatDownBatteries) }
    : { isExist: false };
}
