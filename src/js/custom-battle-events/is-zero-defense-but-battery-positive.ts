import { BatteryDeclaration, GameStateX } from "gbraver-burst-core";

/**
 * バッテリーが残っているのに0防御したかを判定する
 * @param batteryDeclaration バッテリー宣言
 * @return 判定結果、trueでバッテリーが残っているのに0防御した
 */
export function isZeroDefenseButBatteryPositive(
  batteryDeclaration: Readonly<GameStateX<BatteryDeclaration>>,
): boolean {
  const defender = batteryDeclaration.players.find(
    (player) => player.playerId !== batteryDeclaration.activePlayerId,
  );
  if (!defender) {
    return false;
  }

  const isZeroDefense = batteryDeclaration.effect.defenderBattery === 0;
  const isDefenderPositiveBattery = 0 < defender.armdozer.battery;
  return isZeroDefense && isDefenderPositiveBattery;
}
