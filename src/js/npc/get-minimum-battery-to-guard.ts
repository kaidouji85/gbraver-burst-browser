import { PlayerState } from "gbraver-burst-core";
import * as R from "ramda";

import { getBattleResult } from "./get-battle-result";

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
 * ガードされる最小バッテリーを計算する
 * @param attacker 攻撃側のステータス
 * @param defender 防御側のステータス
 * @param defenderBattery 防御側が出すバッテリー
 * @returns 計算結果
 */
export function getMinimumBatteryToGuard(
  attacker: PlayerState,
  defender: PlayerState,
  defenderBattery: number,
): Result {
  const attackerBatteries = R.range(1, attacker.armdozer.battery + 1);
  const batteriesToHitOrCritical = attackerBatteries.filter((battery) => {
    const result = getBattleResult(
      attacker,
      battery,
      defender,
      defenderBattery,
    );
    return result.name === "Guard";
  });
  return 0 < batteriesToHitOrCritical.length
    ? { isExist: true, value: Math.min(...batteriesToHitOrCritical) }
    : { isExist: false };
}
