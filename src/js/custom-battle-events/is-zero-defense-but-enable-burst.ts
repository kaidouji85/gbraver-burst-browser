import { BatteryDeclaration, GameStateX } from "gbraver-burst-core";

/**
 * バーストが使えるのに0防御したかを判定する
 * @param batteryDeclaration バッテリー宣言
 * @returns 判定結果、trueでバーストが使えるのに0防御した
 */
export function isZeroDefenseButEnableBurst(
  batteryDeclaration: Readonly<GameStateX<BatteryDeclaration>>,
): boolean {
  const defender = batteryDeclaration.players.find(
    (player) => player.playerId !== batteryDeclaration.activePlayerId,
  );
  if (defender === undefined) {
    return false;
  }

  const isZeroDefense = batteryDeclaration.effect.defenderBattery === 0;
  return isZeroDefense && defender.armdozer.enableBurst;
}
