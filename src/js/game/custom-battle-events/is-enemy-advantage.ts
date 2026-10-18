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
 * 敵有利かを判定する
 * @param players ゲーム参加プレイヤー
 * @returns 敵有利の場合、trueを返す
 */
export function isEnemyAdvantage(players: Players): boolean {
  const { player, enemy } = players;
  return (
    !isAllPlayerNoDamage([player, enemy]) &&
    player.armdozer.hp < enemy.armdozer.hp
  );
}
