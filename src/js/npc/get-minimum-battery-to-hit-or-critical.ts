import { PlayerState } from "gbraver-burst-core";
import * as R from "ramda";

import { getBattleResult } from "./get-battle-result";

/** 成功 */
type Success = {
  isSuccess: true;
  /** バッテリー値 */
  value: number;
};

/** 失敗 */
type Failure = {
  isSuccess: false;
};

/** 結果 */
type Result = Success | Failure;

/**
 * ヒットまたはクリティカルする最小バッテリーを計算する
 * @param attacker 攻撃側のステータス
 * @param defender 防御側のステータス
 * @param defenderBattery 防御側が出すバッテリー
 * @return 計算結果、ヒットまたはクリティカルしない場合はnull
 */
export function getMinimumBatteryToHitOrCritical(
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
    return result.name === "NormalHit" || result.name === "CriticalHit";
  });
  return 0 < batteriesToHitOrCritical.length
    ? { isSuccess: true, value: Math.min(...batteriesToHitOrCritical)}
    : { isSuccess: false};
}
