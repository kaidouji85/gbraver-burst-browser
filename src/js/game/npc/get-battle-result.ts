import type { BattleResult, PlayerState } from "gbraver-burst-core";
import { battleResult, correctedBattery } from "gbraver-burst-core";

/**
 * 戦闘結果を取得する
 * @param attacker 攻撃側のステータス
 * @param attackBattery 攻撃側が出すバッテリー
 * @param defender 防御側のステータス
 * @param defenseBattery 防御側が出すバッテリー
 * @returns 戦闘結果
 */
export function getBattleResult(
  attacker: PlayerState,
  attackBattery: number,
  defender: PlayerState,
  defenseBattery: number,
): BattleResult {
  const correctedAttackBattery = correctedBattery(
    {
      type: "BATTERY_COMMAND",
      battery: attackBattery,
    },
    attacker.armdozer.effects,
  );
  const correctedDefenseBattery = correctedBattery(
    {
      type: "BATTERY_COMMAND",
      battery: defenseBattery,
    },
    defender.armdozer.effects,
  );
  return battleResult(
    attacker,
    correctedAttackBattery,
    defender,
    correctedDefenseBattery,
  );
}
