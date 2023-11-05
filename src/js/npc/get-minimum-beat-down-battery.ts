import { PlayerState } from "gbraver-burst-core";
import * as R from "ramda";

import { canBeatDown } from "./can-beat-down";

/**
 * 相手を倒せる最低限のバッテリーを取得する
 * @param attacker 攻撃側ステータス
 * @param defender 防御側ステータス
 * @param defenderBattery 防御側バッテリー
 * @return 計算結果、今のバッテリーで倒せない場合はnullを返す
 */
export function getMinimumBeatDownBattery(
  attacker: PlayerState,
  defender: PlayerState,
  defenderBattery: number,
): number | null {
  const defenderBatteries = R.range(1, defender.armdozer.battery + 1);
  const beatDownBatteries = defenderBatteries.filter((battery) =>
    canBeatDown(attacker, battery, defender, defenderBattery),
  );
  return 0 < beatDownBatteries.length ? Math.min(...beatDownBatteries) : null;
}
