import { BatteryDeclaration, GameStateX } from "gbraver-burst-core";

import { LastState } from "../td-scenes/battle/custom-battle-event";

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

/**
 * LastStateからバーストが使えるのに0防御したかを判定する
 * @param props イベントプロパティ
 * @returns 判定結果、trueでバーストが使えるのに0防御した
 */
export function isZeroDefenseButEnableBurstFromLastState(
  props: Readonly<LastState>,
): boolean {
  const isGameOver = props.update.some(
    (s) => s.effect.name === "GameEnd" && s.effect.result.type === "GameOver",
  );
  const batteryDeclaration = props.update.find(
    (s) => s.effect.name === "BatteryDeclaration",
  );
  if (
    isGameOver &&
    batteryDeclaration &&
    batteryDeclaration.effect.name === "BatteryDeclaration"
  ) {
    return isZeroDefenseButEnableBurst({
      ...batteryDeclaration,
      effect: batteryDeclaration.effect,
    });
  }

  return false;
}
