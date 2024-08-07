import { PlayerState, recoverBatteryOnTurnStart } from "gbraver-burst-core";

/**
 * このターンでバッテリーを消費しなかった場合、次の自分のターンで余剰となるバッテリー量を取得する
 * @param player プレイヤーステート
 * @returns 次の自分のターンで余剰となるバッテリー量、余剰がない場合は0を返す
 */
export function getExtraBatteryAtTurnStart(player: PlayerState): number {
  const { battery, maxBattery } = player.armdozer;
  const recoveredBattery = recoverBatteryOnTurnStart(player).recoverBattery;
  return Math.max(battery + recoveredBattery - maxBattery, 0);
}
