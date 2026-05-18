import { battleResult, PlayerId, PlayerState } from "gbraver-burst-core";

import { HUDPlayer } from "../../view/hud/player";

/**
 * ダメージ予想数字を取得する
 * @param options オプション
 * @param options.hudPlayers HUDプレイヤーをあつめたもの
 * @param options.players プレイヤーステートをあつめたもの
 * @param options.activePlayerId 現在アクティブなプレイヤーID
 * @param options.playerId プレイヤーID
 * @param options.nowPlayerBattery 現在のプレイヤーが選択しているバッテリー値
 * @returns ダメージ予想数字
 */
export function getPredicatedDamage(options: {
  hudPlayers: HUDPlayer[];
  players: PlayerState[];
  activePlayerId: PlayerId;
  playerId: PlayerId;
  nowPlayerBattery?: number;
}) {
  const { hudPlayers, players, activePlayerId, playerId, nowPlayerBattery } =
    options;
  const attacker = players.find((p) => p.playerId === activePlayerId);
  const defender = players.find((p) => p.playerId !== activePlayerId);
  const defenderHUD = hudPlayers.find((h) => h.playerId !== activePlayerId);
  if (!attacker || !defender || !defenderHUD) {
    return 0;
  }

  const attackerBattery =
    attacker.playerId === playerId && nowPlayerBattery !== undefined
      ? nowPlayerBattery
      : attacker.armdozer.battery;
  const defenderBattery =
    defender.playerId === playerId && nowPlayerBattery !== undefined
      ? nowPlayerBattery
      : defender.armdozer.battery;
  const result = battleResult(
    attacker,
    attackerBattery,
    defender,
    defenderBattery,
  );
  return result.name === "NormalHit" ||
    result.name === "CriticalHit" ||
    result.name === "Guard"
    ? result.damage
    : 0;
}
