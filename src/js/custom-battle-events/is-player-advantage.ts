import { PlayerState } from "gbraver-burst-core";

import { isAllPlayerNoDamage } from "./is-all-player-no-damage";

/** ゲーム参加プレイヤー */
type Players = {
  /** プレイヤー */
  player: PlayerState;
  /** 敵 */
  enemy: PlayerState;
};

/**
 * プレイヤー有利かを判定する
 * @param players ゲーム参加プレイヤー
 * @returns プレイヤー有利の場合、trueを返す
 */
export function isPlayerAdvantage(players: Players): boolean {
  const { player, enemy } = players;
  return (
    !isAllPlayerNoDamage([player, enemy]) &&
    enemy.armdozer.hp < player.armdozer.hp
  );
}
