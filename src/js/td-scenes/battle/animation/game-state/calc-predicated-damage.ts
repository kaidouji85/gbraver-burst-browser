import {
  battleResult,
  correctedBattery,
  PlayerId,
  PlayerState,
} from "gbraver-burst-core";

/**
 * ダメージ予想を計算する
 * @param options オプション
 * @param options.players プレイヤーステートをあつめたもの
 * @param options.activePlayerId 現在アクティブなプレイヤーID
 * @param options.playerId プレイヤーID
 * @param options.nowPlayerBattery 現在のプレイヤーが選択しているバッテリー値
 * @returns ダメージ予想数字
 */
export function calcPredicatedDamage(options: {
  players: PlayerState[];
  activePlayerId: PlayerId;
  playerId: PlayerId;
  nowPlayerBattery?: number;
}) {
  const { players, activePlayerId, playerId, nowPlayerBattery } = options;
  const attacker = players.find((p) => p.playerId === activePlayerId);
  const defender = players.find((p) => p.playerId !== activePlayerId);
  if (!attacker || !defender) {
    return 0;
  }

  const attackerBattery =
    attacker.playerId === playerId && nowPlayerBattery !== undefined
      ? nowPlayerBattery
      : attacker.armdozer.battery;
  const attackerCorrectedBattery = correctedBattery(
    { type: "BATTERY_COMMAND", battery: attackerBattery },
    attacker.armdozer.effects,
  );
  const defenderBattery =
    defender.playerId === playerId && nowPlayerBattery !== undefined
      ? nowPlayerBattery
      : defender.armdozer.battery;
  const defenderCorrectedBattery = correctedBattery(
    { type: "BATTERY_COMMAND", battery: defenderBattery },
    defender.armdozer.effects,
  );
  const result = battleResult(
    attacker,
    attackerBattery + attackerCorrectedBattery,
    defender,
    defenderBattery + defenderCorrectedBattery,
  );
  return result.name === "NormalHit" ||
    result.name === "CriticalHit" ||
    result.name === "Guard"
    ? result.damage
    : 0;
}
