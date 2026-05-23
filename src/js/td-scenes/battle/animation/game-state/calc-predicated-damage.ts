import {
  battleResult,
  correctedBattery,
  PlayerId,
  PlayerState,
} from "gbraver-burst-core";

/**
 * ダメージ予想を計算する
 * @param options オプション
 * @param options.attacker 攻撃側のプレイヤーステート
 * @param options.defender 防御側のプレイヤーステート
 * @param options.playerId プレイヤーID
 * @param options.playerBattery プレイヤーが出すバッテリー
 * @returns ダメージ予想数字
 */
export function calcPredicatedDamage(options: {
  attacker: PlayerState;
  defender: PlayerState;
  playerId: PlayerId;
  playerBattery: number;
}) {
  const { attacker, defender, playerId, playerBattery } = options;

  const attackerBattery =
    attacker.playerId === playerId ? playerBattery : attacker.armdozer.battery;
  const attackerCorrectedBattery = correctedBattery(
    { type: "BATTERY_COMMAND", battery: attackerBattery },
    attacker.armdozer.effects,
  );
  const defenderBattery =
    defender.playerId === playerId ? playerBattery : defender.armdozer.battery;
  const defenderCorrectedBattery = correctedBattery(
    { type: "BATTERY_COMMAND", battery: defenderBattery },
    defender.armdozer.effects,
  );
  const result = battleResult(
    attacker,
    attackerCorrectedBattery,
    defender,
    defenderCorrectedBattery,
  );
  return result.name === "NormalHit" ||
    result.name === "CriticalHit" ||
    result.name === "Guard"
    ? result.damage
    : 0;
}
