import { PlayerId, PlayerState, predicatedDamage } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { HUDPlayer } from "../../../view/hud/player";

/**
 * ダメージ予想を表示する
 * @param hudPlayers HUDプレイヤーをあつめたもの
 * @param players プレイヤーステート
 * @param activePlayerId 現在アクティブなプレイヤーID
 * @returns アニメーション
 */
export function showPredicatedDamage(
  hudPlayers: HUDPlayer[],
  players: PlayerState[],
  activePlayerId: PlayerId,
): Animate {
  const attacker = players.find(p => p.playerId === activePlayerId);
  const defender = players.find(p => p.playerId !== activePlayerId);
  const defenderHUD = hudPlayers.find(h => h.playerId !== activePlayerId);
  if (!attacker || !defender || !defenderHUD) {
    return empty();
  }

  const damage = predicatedDamage(attacker, defender);
  return defenderHUD.predicatedDamage.show(damage);
}