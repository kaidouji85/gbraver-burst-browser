import { GameState } from "gbraver-burst-core";

/**
 * バッテリーが残っているのに0防御したかを判定する
 * @param stateHistory ステートヒストリー
 * @return 判定結果、trueでバッテリーが残っているのに0防御した
 */
export function isZeroDefenseButBatteryPositive(
  stateHistory: Readonly<GameState[]>,
): boolean {
  const gameOver = stateHistory.find(
    (state) =>
      state.effect.name === "GameEnd" &&
      state.effect.result.type === "GameOver",
  );
  if (!gameOver || gameOver.effect.name !== "GameEnd" || gameOver.effect.result.type !== "GameOver") {
    return false;
  }

  const batteryDeclaration = stateHistory.find(
    (state) => state.effect.name === "BatteryDeclaration",
  );
  if (
    !batteryDeclaration ||
    batteryDeclaration.effect.name !== "BatteryDeclaration"
  ) {
    return false;
  }

  const defender = batteryDeclaration.players.find(
    (player) => player.playerId !== batteryDeclaration.activePlayerId,
  );
  if (!defender) {
    return false;
  }

  const isDefenderBeatedDown = gameOver.effect.result.winner !== defender.playerId;
  const isZeroDefense = batteryDeclaration.effect.defenderBattery === 0;
  const isDefenderPositiveBattery = 0 < defender.armdozer.battery;
  return isDefenderBeatedDown && isZeroDefense && isDefenderPositiveBattery;
}
