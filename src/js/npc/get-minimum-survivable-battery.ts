import { PlayerState } from "gbraver-burst-core";
import * as R from "ramda";

import { canBeatDown } from "./can-beat-down";

/**
 * 生き延びられる最低限のバッテリーを取得する
 * @param defender 防御側ステータス
 * @param attacker 攻撃側ステータス
 * @param attackerBattery 攻撃側バッテリー
 * @return 計算結果、今のバッテリーで生き延びられない場合はnullを返す
 */
export function getMinimumSurvivableBattery(
  defender: PlayerState,
  attacker: PlayerState,
  attackerBattery: number,
): number | null {
  const defenderBatteries = R.range(0, defender.armdozer.battery + 1);
  const survivableBatteries = defenderBatteries.filter(
    (battery) => !canBeatDown(attacker, attackerBattery, defender, battery),
  );
  return 0 < survivableBatteries.length
    ? Math.min(...survivableBatteries)
    : null;
}
