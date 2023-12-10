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
  if (defender === undefined) {
    return false;
  }

  const isZeroDefense = batteryDeclaration.effect.defenderBattery === 0;
  const isBatteryPositive = 0 < defender.armdozer.battery;
  return isZeroDefense && isBatteryPositive;
}
